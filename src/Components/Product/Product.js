import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock, key} = props.product;
    return (
        <div className="product-container">
            <div className="product-img">
                <img src={img} alt="" />
            </div>

            <div className="product-description">
                <h4 className="product-title"><Link to = {"product/"+key}>{name}</Link></h4>
                <small>{`by: ${seller}`}</small>
                <div>
                    <p>${price}</p>
                    <small>only {stock} left in stock - order soon</small>
                </div>
                { props.showAddToCart === true && <button onClick = {() => props.handleCartClick(props.product)} className="product-btn"> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;