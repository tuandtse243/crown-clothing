import './category.style.scss'
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_CATEGORY = gql`
    query($title: String!) {
        getCollectionsByTitle(title: $title) {
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

const SET_CATEGORY = gql`
    mutation($category: Category!) {
        addCategory(category: $category) {
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

const Category = () => {
    const { category } = useParams();
    // const { categoriesMap, loading } = useContext(CategoriesContext)
    const {loading, error, data} = useQuery(GET_CATEGORY, {
        variables: {
            title: category
        }
    });
    console.log(data)

    // const [ addCategory, { loading, error, data } ] = useMutation(SET_CATEGORY)

    // addCategory({variables: {category: categoryObject}})

    useEffect(() => {
        if(data) {
            const {
                getCollectionsByTitle: { items }
            } = data;

            setProducts(items);
        }
    }, [data])

    const [ products, setProducts ] = useState([]);

    // useEffect(() => {
    //     setProducts(categoriesMap[category]);
    // }, [category, categoriesMap])

    return (
        <div>
            <h2 className='category-title'>{category.toLocaleUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}   

export default Category;