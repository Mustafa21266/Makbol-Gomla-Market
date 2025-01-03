import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { addItemToCart, removeFromCart } from '../../actions/cartActions'
import { Link } from 'react-router-dom'
const Cart = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1)
    const { cartItems } = useSelector(state => state.cart)
    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if(newQty <= 0) return;
        dispatch(addItemToCart(id, newQty))

    }
    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if(newQty > stock) return;
        dispatch(addItemToCart(id, newQty))
    }
    const removeItemFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
        alert.success('Item removed from cart')
    }
    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ? <h2 className="mt-5">سلة التسوق</h2> : 
            <Fragment>
<h2 className="mt-5">سلتك تحتوي على : <b>{cartItems.length} صنف</b></h2>
        
        <div className="row d-flex justify-content-between animate__animated animate__fadeIn">
            <div className="col-12 col-lg-12">
                {cartItems.map(item => (
                    <Fragment key={item.product}>
                        <hr />
 <div className="cart-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                        <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} height="90" width="115" /></Link>
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-3 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.price} EGP</p>
                        </div>

                        <div className="col-6 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn minus"  style={{padding: '10px 20px',backgroundColor:'red'}}  onClick={ () => decreaseQty(item.product, item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" style={{padding: '10px 20px'}}  onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-6 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa btn float-right"  style={{textAlign: "center"}} onClick={()=> removeItemFromCartHandler(item.product)}>x</i>
                        </div>

                    </div>
                </div>
                <hr />
                    </Fragment>
                   
                ))}
            </div>

           
        </div>
        <div className="row">
        <div className="col-12 my-4 w-100 d-flex justify-content-center animate__animated animate__fadeIn  animate__delay-2s">
                <div id="order_summary" className="w-100">
                    <h4 style={{textAlign: 'center'}}>ملخص الأوردر</h4>
                    <hr />
                    <p style={{textAlign: 'left'}}>: السعر  <span className="order-summary-values">{cartItems.reduce((acc, item)=> (acc + Number(item.quantity)), 0)} (Units)</span></p>
                    <p style={{textAlign: 'left'}}>  :  المجموع المحتمل <span className="order-summary-values">{cartItems.reduce((acc, item)=> (acc + item.quantity * item.price), 0).toFixed(2)} EGP</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-block" style={{backgroundColor:'#178a53'}} onClick={checkOutHandler}>تأكيد الطلب</button>
                </div>
            </div>
        </div>
            </Fragment>
            }
        </Fragment>
    )
}

export default Cart
