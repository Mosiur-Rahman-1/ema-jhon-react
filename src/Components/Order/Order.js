import React from 'react';
import './Order.css';


const Order = () => {
    return (
        <div className = "order-container">
            <h3 className = "order-text-align">Order Summary</h3>
            <h5 className = "order-text-align">Items ordered:0</h5>
            <p>Items:	$0</p>
            <p>Shipping & Handling:	$0</p>
            <p>Total before tax:	$0</p>
            <p>Estimated Tax:	$0</p>
            <h4>Order Total:	$0</h4>
            <button className = "product-btn">Review your order</button>
        </div>
    );
};

export default Order;