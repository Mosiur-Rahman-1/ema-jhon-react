import React from 'react';
import './Order.css';


const Order = (props) => {
    let cart = props.cart;
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = (totalPrice + product.price) * product.quantity;
    }
    const orderTotal = totalPrice.toFixed(2);

    const formatNumber = num => {
        const convertToNumber = num.toFixed(2);
        return convertToNumber;
    }

    
    return (
        <div className = "order-container">
            <h3 className = "order-text-align">Order Summary</h3>
            <h5 className = "order-text-align">Items ordered:{cart.length}</h5>
            <p>Items:	{cart.length}</p>
            {/* <p>Shipping & Handling:	${shipping}</p> */}
            <p>Total before tax:	${formatNumber (totalPrice)}</p>
            {/* <p>Estimated Tax:	${tax}</p> */}
            <h4>Order Total:	${orderTotal}</h4>
            {
                props.children
            }
        </div>
    );
};

export default Order;