import './category.style.scss'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
    const { category } = useParams();
    console.log('reder / re-rendering category component')
    const categoriesMap = useSelector(selectCategoriesMap);

    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

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