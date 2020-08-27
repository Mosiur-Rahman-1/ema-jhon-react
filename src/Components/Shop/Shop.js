import React from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Order from '../Order/Order';

const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    return (
        <div className= "shop-container">
            <div className="product-container">
                {
                    firstTen.map(product => <Product product = {product}></Product>)
                } 
            </div>
            
            <div className="order-container"><Order></Order></div>
        </div>
    );
};

export default Shop;