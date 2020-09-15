import React from 'react';
import './Review.css';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import Order from '../Order/Order';
import Image from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';



const Review = () => {
    const [cart, setCart] = useState([]);
    const handleClickFinalCart = (productkey) => {
        console.log("product removed", productkey);
        const latestCart = cart.filter(pd => pd.key !== productkey);
        setCart(latestCart);
        removeFromDatabaseCart(productkey);
    }

    const [ordePlaced, setOrderPlaced] = useState(false);
    const history = useHistory()

    const handleProcedCheckOut = () => {
      
        history.push ('/shipment') //used useHistory hook to redirect the click proced to checkout to shipment page
    }
    // console.log(cart);
    useEffect (() => {
        const getSavedOrder = getDatabaseCart();
        const savedProductKey = Object.keys(getSavedOrder); // Object.keys() is a method to get all the product key separately from an object and for values Object.values().
        // const saveProductAmount = Object.values(getSavedOrder);
        const cartProducts = savedProductKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = getSavedOrder[key]; //pushing a quantitty named value to the to the getSavedOrder with the product quantity with the specific key values that hold
            return product;
        })
        // console.log (savedProductKey);
        // console.log (cartProducts);
        setCart(cartProducts);
    }, [])
   
    let orderDoneImage;
    if (ordePlaced) {

        orderDoneImage = <img src={Image} alt= ""/>;
    }
    
    return (
        <div className = "shop-container">
            <div className="product-container">
            <p>Total product You order: {cart.length}</p>
                {
                    cart.map(pd => <ReviewProduct handleClickFinalCart = {handleClickFinalCart} product = {pd} key = {pd.key}></ReviewProduct>)
                }
                {orderDoneImage};
            </div>
            <div className="order-container">
                <Order cart = {cart}>
                    <button onClick = {handleProcedCheckOut} className = "product-btn">Proced checkout</button>
                </Order>
            </div>
        </div>
    );
};

export default Review;