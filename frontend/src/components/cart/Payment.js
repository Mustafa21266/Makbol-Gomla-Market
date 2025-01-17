import React, { Fragment, useEffect} from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { saveShippingInfo } from '../../actions/cartActions'
import { Link } from 'react-router-dom'
import ChekoutSteps from './ChekoutSteps'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js'
import axios from 'axios'

const options = {
    style: {
        base: {
            fontSize:  '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}
const Payment = ({ history }) => {
    const alert = useAlert();
    // const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
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
    const { error } = useSelector(state => state.newOrder)
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch , alert, error])
    
const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true
    let res;
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        res = await axios.post('/api/v1/payment/process', paymentData, config);
        const clientSecret = res.data.client_secret
        let result = {
            paymentIntent : {
                status: 'succeeded'
            }
        }
            if(result.paymentIntent.status === 'succeeded'){
                order.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status
                }
                dispatch(createOrder(order))
                history.push('/success')
            }
        // if(!stripe || !elements){
        //     return;
        // }
        // const result = await stripe.confirmCardPayment(clientSecret,{
        //     payment_method: {
        //         card: elements.getElement(CardNumberElement),
        //         billing_details: {
        //             name: user.name,
        //             email: user.email
        //         }
        //     }
        // })
        
        // if(result.error){
        //     alert.error(result.error.message);
        //     document.querySelector('#pay_btn').disabled = false
        // }else {
        //     //Payment is processed or not
        //     if(result.paymentIntent.status === 'succeeded'){
        //         order.paymentInfo = {
        //             id: result.paymentIntent.id,
        //             status: result.paymentIntent.status
        //         }
        //         dispatch(createOrder(order))
        //         history.push('/success')
        //     }else {
        //         alert.error('There is an issue with the payment process, please try again later')
        //     }
        // }

    } catch (error) {
        document.querySelector('#pay_btn').disabled = false
        // alert.error(error.response.statusText)
    }
}
    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <ChekoutSteps shipping confirmOrder payment/>
            <div className="row wrapper animate__animated animate__fadeIn">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4" style={{display: 'block',margin: 'auto'}}>Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  {/* <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                  /> */}
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  {/* <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    options={options}
                  /> */}
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  {/* <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}
                  /> */}
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                </button>
    
              </form>
			  </div>
        </div>
        </Fragment>
    )
}

export default Payment
