import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { getOrderDetails } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import { loadUser } from '../../actions/userActions'

import { myOrders, clearErrors } from '../../actions/orderActions'

const OrderDetails = ({ history , match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { loading , error, orders } = useSelector(state => state.myOrders)
    const order = orders.map(item => {
        if(item._id === match.params.id){
            return item
        }
    })[0]
    const { shippingInfo, orderItems, paymentInfo, totalPrice, orderStatus} = order;
    
    // const [data, setData]= useState(setOrders())
    useEffect(()=>{
        // dispatch(loadUser())
        // dispatch(getOrderDetails(match.params.id))
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, order, isAuthenticated, alert, error, match.params.id])
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    return (
        <Fragment>
            <MetaData title={'Order Details'} />
            {loading ? <Loader /> : (
                 <Fragment>

<div className="row d-flex justify-content-between  animate__animated animate__fadeIn">
                    <div className="col-12 col-lg-8 mt-5 order-details">

                        {/* <h2 className="my-5">أوردر رقم  {order._id}</h2> */}

                        <h4 className="mb-4">تفاصيل التوصيل</h4>
                        <p><b>الإسم :</b> {user && user.name}</p>
                        <p><b>رقم التليفون :</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>العنوان : </b>{` ${shippingInfo && shippingInfo.address}, ${shippingInfo && shippingInfo.city}, ${shippingInfo && shippingInfo.country}`}</p>
                        <p><b>السعر : </b> EGP {totalPrice}</p>

                        <hr />

                        {/* <h4 className="my-4">: حالة الدفع <span className={isPaid ? "greenColor" : "redColor" }>{isPaid ? "PAID" : "NOT PAID" }</span></h4> */}
                        {/* <p className={isPaid ? "greenColor" : "redColor" }><b>{isPaid ? "PAID" : "NOT PAID" }</b></p> */}

                        {order.orderStatus && String(order.orderStatus).includes('Delivered') ?  
                        <h4 className="my-4">حالة الأوردر : <span className="greenColor">تم التوصيل</span></h4> : 
                        String(order.orderStatus).includes('Processing') ?
                        <h4 className="my-4">حالة الأوردر : <span style={{color: 'red'}}>تحت التأكيد</span></h4> 
                        : 
                        String(order.orderStatus).includes('Shipped') ? <h4 className="my-4">حالة الأوردر : <span style={{color: 'orange'}}>جاري التوصيل</span></h4> : ''

                        }
                       
                        {/* <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor" } ><b>{orderStatus}</b></p> */}


                        <h4 className="my-4">محتويات الأوردر :</h4>

                        <hr />
                        {orderItems && orderItems.map(item => (
                            <div key={item.product} className="cart-item my-1">
                            
                            <div className="row my-5">
                                <div className="col-4 col-lg-2">
                                <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} height="45" width="65" /></Link>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-3 col-lg-2 mt-4 mt-lg-0">
                                    <p className="text-center">${item.price}</p>
                                </div>

                                <div className="col-12 col-lg-3 mt-4 mt-lg-0">
                                    <p className="text-center"> {item.quantity} قطعة </p>
                                </div>
                            </div>
                </div>
                        ))}
                        
                        <hr />
                    </div>
                </div>

                 </Fragment>
            )}
        </Fragment>
    )
}

export default OrderDetails
