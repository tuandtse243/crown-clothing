import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { fetchCategoriesAsync } from '../../store/categories/category.action'; 

import './shop.style.scss'

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
            console.log('aaaaaaaaaaaa');
            dispatch(fetchCategoriesAsync());
    }, [])
    console.log('bbbbbbbbbbbb')
    return (
            <Routes>
                {console.log('ccccccccccc')}
                <Route index element={<CategoriesPreview/>} />
                <Route path=':category' element={<Category/>} />
            </Routes>
    )
}

export default Shop;