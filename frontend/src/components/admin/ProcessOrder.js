import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { getOrderDetails, updateOrder, clearErrors} from '../../actions/orderActions'
import Sidebar from './Sidebar'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import { allUsers } from '../../actions/userActions'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const ProcessOrder = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, order } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const [status, setStatus] = useState('Processing');
    // const [orderUser, setOrderUser] = useState('');
    const { users } = useSelector(state => state.allUsers)
    const orderId = match.params.id
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    });
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(allUsers())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated){
        //   history.push('/admin/orders')
          alert.success('تم تحديث بيانات الأوردر')
          dispatch({ type: UPDATE_ORDER_RESET})
      }
        
    },[dispatch, error, alert, isUpdated, orderId])
    console.log(users)
    function updateOrderHandler(id){
        const formData = new FormData();
        formData.set('status',status)
        // formData.set('_id',orderUser)
        dispatch(updateOrder(id,formData));
    }
    const shippingDetails = shippingInfo &&  `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    return (
        <Fragment>
        <MetaData title={`: معالجة الأوردر ${order && order._id}`} />
        <div className="row  animate__animated animate__fadeIn  animate__delay-1s">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10" style={{padding: '45px'}} ref={componentRef}>
                <Fragment>
                    {loading ? <Loader /> : (

                        <Fragment>
<div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-7 order-details">

                        {/* <h2 className="my-5">رقم الأوردر {order._id}</h2> */}
                        <div>
                        <button onClick={handlePrint}>Print article</button>
  </div>
                        <h4 className="mb-4">عنوان التوصيل</h4>
                        <span><b>: الإسم</b> {user && user.name}</span>
                        <span><b>: رقم التليفون</b> {shippingInfo && shippingInfo.phoneNo}</span>
                        <span className="mb-4"><b>: العنوان</b>{shippingDetails}</span>
                        <span><b>السعر</b> ${totalPrice}</span>

                        <hr />

                        <h4 className="my-4">: الدفع<span className={isPaid ? "greenColor" : "redColor" }>{isPaid ? "PAID" : "NOT PAID" }</span></h4>
                        {/* <p className={isPaid ? "greenColor" : "redColor" }><b>{isPaid ? "PAID" : "NOT PAID" }</b></p> */}

                        <h4 className="my-4">Stripe ID : <span>{paymentInfo && paymentInfo.id}</span></h4>
                        {/* <p><b>{paymentInfo && paymentInfo.id}</b></p> */}


                        <h4 className="my-4"> : حالة الأوردر <span className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor" }>{orderStatus}</span></h4>
                        {/* <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor" } ><b>{orderStatus}</b></p> */}

                        <h4 className="my-4">عدد القطع</h4>

                        <hr />
                        <div className="cart-item my-1">
                        {orderItems && orderItems.map(item => (
                            <Fragment>
 <div key={item.product} className="cart-item my-1">
                            
                            <div className="row my-5">
                                <div className="col-4 col-lg-2">
                                <Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} height="45" width="65" /></Link>
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-3 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-12 col-lg-3 mt-4 mt-lg-0">
                                    <p className="text-center"> {item.quantity} قطعة </p>
                                </div>
                            </div>
                           
                </div>
                     <hr />
                            </Fragment>
                           
                        ))}
                        </div>
                    </div>
					
					<div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">الحالة</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e)=> setStatus(e.target.value)}
                                        >
                                            <option value="Processing" selected>تحت التأكيد</option>
                                            <option value="Shipped">جارى التوصيل</option>
                                            <option value="Delivered">تم التوصيل</option>
                                        </select>
                                    </div>
                                    <h4 className="my-4">العميل</h4>

                                    {/* <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='orderUser'
                                            value={orderUser}
                                            onChange={(e)=> setOrderUser(e.target.value)}
                                        >
                                            {users.map(user => (
                                                <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                                        </select>
                                    </div> */}

                                    <button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
                                        حفظ
                                </button>
                                </div>
					
                </div>

                        </Fragment>
                        )}
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default ProcessOrder
