import React from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Order from '../Order/Order';
import { useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const getSavedOrder = getDatabaseCart();
        const savedProductKey = Object.keys(getSavedOrder);
        console.log (savedProductKey);
        const newCartProducts = savedProductKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = getSavedOrder[key]; //pushing a quantitty named value to the to the getSavedOrder with the product quantity with the specific key values that hold
            return product;
        })

        setCart(newCartProducts);

    } ,[])

    let handleCartClick = (product) => {
        const toBeAddedKey = product.key
        const sameProductToLocal = cart.find(pd => pd.key === toBeAddedKey.key);
        let count = 1;
        let newCart;
        if (sameProductToLocal) {
            count = sameProductToLocal.quantity + 1;
            sameProductToLocal.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProductToLocal];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        
        addToDatabaseCart (product.key, count);
      }
    return (
        <div className= "shop-container">
            <div className="product-container">
                {
                    firstTen.map(product => <Product key = {product.key} handleCartClick = {handleCartClick} showAddToCart = {true} product = {product}></Product>)
                } 
            </div>
            
            <div className="order-container"><Order cart = {cart}>
                <Link to = "/order"><button className = "product-btn">Review your order</button></Link>
            </Order></div>
        </div>
    );
};

export default Shop;