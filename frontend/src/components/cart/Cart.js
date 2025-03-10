import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../actions/productActions'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { addItemToCart, removeFromCart, clearCart } from '../../actions/cartActions'
import { Link } from 'react-router-dom'
import { getAdminProducts } from '../../actions/productActions'
import axios from 'axios'
import { createOrder } from '../../actions/orderActions'
const Cart = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1)
    const [refresh, setRefresh] = useState(false)
    const { cartItems } = useSelector(state => state.cart)
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 0
    const taxPrice = 0.0
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
    const { error, products } = useSelector(state => state.products);
    const [orderUser, setOrderUser] = useState("قطاعي");
    const [prod_id, setProdId ] = useState("");
    const data = {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice,
        taxPrice,
        totalPrice
    }
    sessionStorage.setItem('orderInfo',JSON.stringify(data))
    useEffect(()=>{
            dispatch(getAdminProducts())
            if(error){
                alert.error(error)
                dispatch(clearErrors())
            }
        },[dispatch, alert, error, refresh])

const addToCart = (id) => {
        dispatch(addItemToCart(id, quantity))
        alert.success('تم إضافة المنتج في سلة التسوق')
    }
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
        alert.success('! تمت إزالة المنتج بنجاح')
    }
    const checkOutHandler = () => {
        history.push('/shipping')
    }
    const checkOutHandlerPOS = () => {
        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
        let order = {
            orderItems: cartItems,
            shippingInfo: { address: "شارع إبن مماتي", city: "الحضرة", postalCode: "55555", phoneNo: "01224703104", country: "الإسكندرية", user: orderUser}
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
            let res = axios.post('/api/v1/payment/process', paymentData, config);
            // const clientSecret = res.data.client_secret
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
                    order.token = localStorage.getItem('token')
                    dispatch(createOrder(order))
                    dispatch(clearCart())
                    setRefresh(!refresh)
                    alert.success('تم عمل الأوردر بنجاح !')
    }
}
    return (
        <Fragment>
            <MetaData title={'Your Cart'} />
            {cartItems.length === 0 ? 
//              <Fragment>
//                 <h2 className="mt-5">سلة التسوق</h2>
//                 <form class="row">
//   <div className="col-12 col-md-10">
//     <label for="inputPassword2" className="visually-hidden">إسم المنتج : </label>
//     <div className="form-group">
//                                         <select
//                                             className="form-control"
//                                             name='prod_id'
//                                             value={prod_id}
//                                             id="prod_id"
//                                             onChange={(e) => {setProdId(e.target.value)}}
//                                         >
//                                             {products
//                                             .sort((a, b) => a.name.localeCompare(b.name))
//                                             .sort((a, b) => a.category.localeCompare(b.category))
//                                             .map((product, index) => {
//                                                 if(index === 0){
//                                                     return (
//                                                     <option value={product._id} selected>{product.name}</option>
//                                                     )
//                                                 }else {
//                                                     return (
//                                                         <option value={product._id}>{product.name}</option>
//                                                         )
//                                                 }
//                                             })}
//                                         </select>
//                                     </div>
//   </div>
//   <div className="col-12 col-md-2">
//     <button type="button" style={{ textDecoration: 'none',backgroundColor:'#178a53' }}  className="btn text-white d-block mx-auto" onClick={(e)=> addToCart(prod_id)}>إضافة</button>
//   </div>
// </form>
//             </Fragment>
''
            : 
            <Fragment>
                <h2 className="mt-5">سلة التسوق</h2>
                <br />
                <hr />
                {/* <form class="row">
  <div className="col-12 col-md-10">
  <label for="inputPassword2" className="visually-hidden">إسم المنتج : </label>
                <br />
    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='prod_id'
                                            value={prod_id}
                                            id="prod_id"
                                            onChange={(e) => {setProdId(e.target.value)}}
                                        >
                                            {products
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .sort((a, b) => a.category.localeCompare(b.category))
                                            .map((product, index) => {
                                                if(index === 0){
                                                    return (
                                                    <option value={product._id} selected>{product.name}</option>
                                                    )
                                                }else {
                                                    return (
                                                        <option value={product._id}>{product.name}</option>
                                                        )
                                                }
                                            })}
                                        </select>
                                    </div>
  </div>
  <div className="col-12 col-md-2 d-flex">
    <button type="button" className="btn btn-primary d-block mx-auto" onClick={(e)=> addToCart(prod_id)}>إضافة</button>
  </div>
</form> */}
<br />
<h2 className="mt-5">سلتك تحتوي على : <b>{cartItems.length} صنف</b></h2>
<br />
                <hr />
                <br />
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
                            <Link style={{color: 'white'}} to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-3 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">{item.price} EGP</p>
                        </div>

                        <div className="col-6 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn minus"  style={{padding: '10px 10px',backgroundColor:'red'}}  onClick={ () => decreaseQty(item.product, item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" style={{padding: '10px 10px'}}  onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-6 col-lg-1 mt-4 mt-lg-0">
                            <i id="delete_cart_item" className="fa btn float-right"  style={{textAlign: "center"}} onClick={()=> removeItemFromCartHandler(item.product)}><img src="https://res.cloudinary.com/dvlnovdyu/image/upload/v1736898894/circle-x_mggwcv.png" alt="Circle X Delete" style={{width: "40px", height: "40px"}}/></i>
                        </div>

                    </div>
                </div>
                <hr />
                    </Fragment>
                   
                ))}
            </div>

           
        </div>
        <div className="row">
        <div className="col-12 w-100 d-flex justify-content-center animate__animated animate__fadeIn  animate__delay-2s">
                <div id="order_summary" className="w-100">
                    <h4 style={{textAlign: 'center'}}>ملخص الأوردر</h4>
                    <hr />
                    <div className='row'>
                    <div className='col-6'>
<h6 style={{color: 'white', textAlign: 'center'}}>عدد القطع : </h6>
</div>
<div className='col-6'>
<p style={{textAlign: 'right'}}><span className="order-summary-values">{cartItems.reduce((acc, item)=> (acc + Number(item.quantity)), 0)} (قطع)</span></p>
</div>
                    </div>
                    <div className='row'>
                    <div className='col-6'>
                    <h6 style={{color: 'white', textAlign: 'center'}}>السعر : </h6>
</div>
<div className='col-6'>
<p style={{textAlign: 'right'}}> 
                       <h6 style={{color: 'white', textAlign: 'center'}}>
                            {cartItems.reduce((acc, item)=> {
                        if(String(acc).includes(`${item.price}`)){

                        }else {
                            return `${Number(item.price)}`
                        }
                    }, 0)}
                        <span style={{marginLeft: '15px',marginRight: '15px'}}>EGP</span> 
                        </h6>
                        </p>
</div>
                    </div>
                    <div className='row'>
                    <div className='col-6'>
                    <h6 style={{color: 'white', textAlign: 'center'}}>المجموع المحتمل  :  </h6>
</div>
<div className='col-6'>
<p style={{textAlign: 'right'}}>
   <h6 style={{color: 'white', textAlign: 'center'}}>
        {cartItems.reduce((acc, item)=> (acc + item.quantity * item.price), 0).toFixed(2)}
            <span style={{marginLeft: '15px',marginRight: '15px'}}>EGP</span>
            </h6>
    </p>

</div>
                    </div>
    
                    <hr />
                    {!window.location.href.includes("/admin/pos") && (
                    <button id="checkout_btn" className="btn btn-block" style={{backgroundColor:'#178a53',color: 'white'}} onClick={checkOutHandler}>تأكيد الطلب</button>
                    )}
                    {window.location.href.includes("/admin/pos") && (
                    <button id="checkout_btn" className="btn btn-block" style={{backgroundColor:'#178a53',color: 'white'}} onClick={checkOutHandlerPOS}>تأكيد الطلب</button>
                    )}
                </div>
            </div>
        </div>
            </Fragment>
            }
        </Fragment>
    )
}


export default Cart
