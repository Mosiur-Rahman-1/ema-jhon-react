import React from 'react';
import './ReviewProduct.css';

const ReviewProduct = (props) => {
    const {name, quantity, key} = props.product
    return (
        <div className= "cart-product">
            <p>{name}</p>
            <p>Quantity: {quantity}</p>
            <button onClick = {() => props.handleClickFinalCart(key)} className = "final-cart-button">Remove order</button>
        </div>
    );
};

export default ReviewProduct;