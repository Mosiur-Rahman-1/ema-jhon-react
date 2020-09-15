import React from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams();
    const product = fakeData.find(product => product.key === productkey);
    return (
        <div>
            <h1>Your Product details</h1>
            <Product product = {product} showAddToCart = {false}></Product>
        </div>
    );
};

export default ProductDetail;