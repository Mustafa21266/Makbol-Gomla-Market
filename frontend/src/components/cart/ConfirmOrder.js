
import React, { Fragment, useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { saveShippingInfo } from '../../actions/cartActions'
import { Link } from 'react-router-dom'
import ChekoutSteps from './ChekoutSteps'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js'
import axios from 'axios'
import { getProductDetails } from '../../actions/productActions'
import Loader from '../layout/Loader'

const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    //Calculate order prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 0
    const taxPrice = 0.0
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
    async function doP(params) {
        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    let order = {
        orderItems: cartItems,
        shippingInfo
    }
    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice
        order.taxPrice = orderInfo.taxPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json' 
        }
    }
        let res = await axios.post('/api/v1/payment/process', paymentData, config);
        const clientSecret = res.data.client_secret
        let result = {
            paymentIntent : {
                status: 'succeeded'
            }
        }
            console.log(result)
            if(result.paymentIntent.status === 'succeeded'){
                order.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status
                }
                dispatch(createOrder(order))
                localStorage.removeItem('cartItems')
                history.push('/success')
            }
    }
    const proceedToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        doP();
        // history.push('/payment')
    }
    return (
        <Fragment>
            <MetaData title={'تأكيد الأوردر'} />
            <ChekoutSteps shipping confirmOrder/>
            <div className="row d-flex justify-content-between animate__animated animate__fadeIn">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3" style={{textAlign: 'center'}}>معلومات التوصيل</h4>
                <p><b>الإسم : </b> {shippingInfo.orderUser}</p>
                <p><b>رقم التليفون : </b> {shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>العنوان : </b>{` ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                
                <hr />
                <h4 className="mt-4">عدد محتويات السلة : </h4>

                <hr />
                {cartItems.map(item => (
                    <Fragment key={item.product} >
                <div className="cart-item my-1">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.image} alt={item.name} height="45" width="65" />
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link style={{color: 'white'}} to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-12 col-lg-4 mt-4 mt-lg-0 text-right">
                            <div className='w-100 d-block mx-auto' style={{textAlign: 'center',color: 'white'}}>
                            {item.quantity}
                            </div>
                            <div className='w-100 d-block mx-auto' style={{textAlign: 'center',color: 'white'}}>
                             x 
                            </div>
                            <div className='w-100 d-block mx-auto' style={{textAlign: 'center',color: 'white'}}>
                            {item.price}
                            </div>
                            <div className='w-100 d-block mx-auto' style={{textAlign: 'center',color: 'white'}}>
                            = <b>{(item.quantity * item.price).toFixed(2)} EGP</b>
                            </div>
                        </div>

                    </div>
                </div>
                    </Fragment>
                    
                ))}
                
                <hr />

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4 style={{textAlign: 'center'}}>ملخص الأوردر</h4>
                        <hr />
                        <p>
                            <span className="d-block mx-auto text-right">
                          السعر : 
                            </span>
                            <h4 className="order-summary-values w-100 text-center">{itemsPrice}</h4>
                        </p>
                        {/* <p>: عنوان التوصيل <span className="order-summary-values">${shippingPrice}</span></p>
                        <p>: ضريبة  <span className="order-summary-values">${taxPrice}</span></p> */}

                        <hr />

                        <p>
                        <span className="d-block mx-auto text-right">
                            المجموع : 
                             </span>
                             <h3 className="order-summary-values w-100 text-center">{totalPrice}</h3>
                        </p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}>إستكمال</button>
                    </div>
                </div>
			
			
        </div>
        </Fragment>
    )
}

export default ConfirmOrder
