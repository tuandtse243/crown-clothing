import { createContext, useState, useEffect, useReducer } from "react";
import { gql, useQuery } from "@apollo/client";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {},
    
});

const COLLECTIONS = gql`
    query {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`

export const CategoriesProvider = ({children}) => {
    const {loading, error, data} = useQuery(COLLECTIONS);
    const [categoriesMap, setcategoriesMap] = useState({});
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])   thêm file json lên firebase
    // useEffect(() => {
    //     const getCategoriesMap = async () => {
    //         const categoryMap = await getCategoriesAndDocuments();
    //         setcategoriesMap(categoryMap);
    //     }
    //     getCategoriesMap();
    // }, [])
    useEffect(() => {
        if(data) {
            const {collections} = data;
            const collectionsMap = collections.reduce((acc, collection) => {
                const {title, items} = collection;
                acc[title.toLowerCase()] = items;
                return acc;
            }, {});
            setcategoriesMap(collectionsMap);
        }
    }, [data])
    console.log(data)
    const value = { categoriesMap, loading }

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}