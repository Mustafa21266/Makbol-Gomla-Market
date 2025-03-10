import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { getOrderDetails, updateOrder, clearErrors} from '../../actions/orderActions'
import Sidebar from './Sidebar'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import { allUsers } from '../../actions/userActions'
import { useReactToPrint } from "react-to-print";

const ProcessOrder = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, order } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const [status, setStatus] = useState('Processing');
    const [discount, setDiscount] = useState(0);
    const { users } = useSelector(state => state.allUsers)
    const orderId = match.params.id
    // const componentRef = useRef<HTMLDivElement>(null);
    const componentRef =  React.createRef()
    const handlePrint = useReactToPrint({ contentRef: componentRef });
	// const now = new Date();
	let date = new Date();
var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];
var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"];
var delDateString = days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
    // const  = useRef();
    // const handlePrint = useReactToPrint({
    // content: () => componentRef.current,
    // });
    // const contentRef = useRef();
    // const reactToPrintFn = useReactToPrint({ contentRef });
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
    function updateOrderHandler(id){
        const formData = new FormData();
        formData.set('status',status)
        formData.set('discount', discount)
        formData.set('token',localStorage.getItem('token'))
        // formData.set('_id',orderUser)
        dispatch(updateOrder(id,formData));
    }
    const shippingDetails = shippingInfo &&  `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`
    return (
        <Fragment>
        <MetaData title={`: معالجة الأوردر ${order && order._id}`} />
        <div className="row  animate__animated animate__fadeIn  animate__delay-1s">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10" style={{padding: '45px'}}>
                <Fragment>
                    {loading ? <Loader /> : (

                        <Fragment>
<div className="row d-flex justify-content-around">
                        <button className="btn ml-4" style={{backgroundColor:'#178a53',color: 'white'}} id="login_btn" onClick={handlePrint}>طباعة الفاتورة</button>
                    <div className="col-12 col-lg-7 order-details printContent"  ref={componentRef}>
                        {/* <h2 className="my-5">رقم الأوردر {order._id}</h2> */}
                        <div style={{padding: '15px'}}>
  </div>
                        <div ref={componentRef} style={{background: 'white',width: '100%',padding: '25px'}}>
                        <h1 style={{color: 'black',textAlign: 'center',fontSize: '84px',marginBottom: '10px'}}>مقبول جملة ماركت</h1>
	<br />
	<hr />
	<br />
	<h1 style={{color: 'black',textAlign: 'center',fontSize: '74px'}}>فاتورة شراء</h1>
	<br />
	<hr />
	<div className='row'>
<div className='col-8'>
	<h2  style={{color:'black',fontSize: '44px'}}>{delDateString} </h2>
	</div>
                         <div className='col-4'>
                         <h4 className="my-4" style={{color:'black',fontSize: '44px'}}> :  التاريخ</h4>
</div>
                         </div>
	<br />
	<hr />
	<div className='row'>
<div className='col-8'>
	<h2  style={{color:'black',fontSize: '44px'}}>{user && user.name}  </h2>
	</div>
                         <div className='col-4'>
                         <h4 className="my-4" style={{color:'black',fontSize: '44px'}}> : الإسم</h4>
</div>
                         </div>
<div className='row'>
<div className='col-8'>
	<h2  style={{color:'black',fontSize: '44px'}}>{shippingInfo && shippingInfo.phoneNo} </h2>
	</div>
                         <div className='col-4'>
                         <h4 className="my-4" style={{color:'black',fontSize: '44px'}}> : رقم التليفون</h4>
</div>
                         </div>
<div className='row'>
<div className='col-8'>
	<h2  style={{color:'black',fontSize: '44px'}}><b></b> {shippingDetails}</h2>
	</div>
                         <div className='col-4'>
                         <h4 className="my-4" style={{color:'black',fontSize: '44px'}}> : العنوان</h4>
</div>
                         </div>
                        
                         {/* <h1 className="mb-4" style={{color:'black',fontSize: '44px'}}>عنوان التوصيل</h1> */}
                        
                        
                        {/* <h2  className="mb-4" style={{color:'black',fontSize: '44px'}}><b>السعر : </b> {totalPrice}</h2> */}

                        <hr />
                         <div className='row'>
<div className='col-3'>
<h4 className="my-4" style={{color:'black',fontSize: '44px'}}>الإجمالي</h4>
</div>
<div className='col-3'>
<h4 className="my-4" style={{color:'black',fontSize: '44px'}}>السعر</h4>
</div>
<div className='col-3'>
<h4 className="my-4" style={{color:'black',fontSize: '44px'}}>الصنف</h4>
</div>
                         <div className='col-3'>
                         <h4 className="my-4" style={{color:'black',fontSize: '44px'}}>عدد القطع</h4>

</div>
                         </div>
                         
                        <div className="cart-item my-1">
                        {orderItems && orderItems.map(item => (
                            <Fragment>
 <div key={item.product} className="cart-item my-1">
                            
                            <div className="row my-5">
                                <div className="col-3 col-lg-2">
                                <h2  className="mb-4" style={{color:'black',fontSize: '44px', textAlign:'center'}}>{parseFloat(item.price) * parseInt(item.quantity)}</h2>
                                {/* <img src={item.image} alt={item.name} height="45" width="65" /> */}
                                </div>
                                
                                <div className="col-3 col-lg-3 mt-4 mt-lg-0">
                                <h2 style={{color:'black',fontSize: '44px', textAlign:'center'}}>{item.price}</h2>
                                    {/* <p>${item.price}</p> */}
                                </div>

                                <div className="col-4 col-lg-3">
                                    <h2 style={{color:'black',fontSize: '44px', textAlign:'center'}}>{item.name}</h2>
                                    {/* <Link to={`/product/${item.product}`}>{item.name}</Link> */}
                                </div>



                                <div className="col-2 col-lg-3 mt-4 mt-lg-0">
                                <h2 style={{color:'black',fontSize: '44px', textAlign:'center'}}>{item.quantity}</h2>
                                    {/* <p className="text-center"> {item.quantity} قطعة </p> */}
                                </div>
                            </div>
                           
                </div>
                     <hr />
                            </Fragment>
                           
                        ))}
                        </div>
                        </div>
                        {order.discount && (
                            <div className='row'>
                            <div className='col-4'>
                            <h4 className="w-100" style={{color:'black',textAlign: 'center',fontSize: '64px'}}>{order.discount}</h4>
                            </div>
                            <div className='col-4'>
                            
                            </div>
                                                     <div className='col-4'>
                                
                                                     <h2 className="mb-4" style={{color:'black',fontSize: '58px'}}><b> : الخصم</b></h2>
                            
                            </div>
                                                     </div>
                        )}         
<div className='row'>
<div className='col-4'>
<h4 className="w-100" style={{color:'black',textAlign: 'center',fontSize: '64px'}}>{totalPrice}</h4>
</div>
<div className='col-4'>

</div>
                         <div className='col-4'>
	
                         <h2 className="mb-4" style={{color:'black',fontSize: '58px'}}><b> : المجموع</b></h2>

</div>
                         </div>
	<hr />
	<br />
	<br />








	<div className='row'>
<div className='col-4'>
<h4 className="my-4" style={{color:'black',fontSize: '56px', textAlign: 'center'}}>01127807379</h4>
</div>
	<div className='col-8'>
<h4 className="my-4" style={{color:'black',fontSize: '56px', textAlign: 'center'}}> : للتواصل</h4>
	</div>
                         </div>







                         	<div className='row'>
<div className='col-4'>
<h4 className="my-4" style={{color:'black',fontSize: '56px', textAlign: 'center'}}>01027168516</h4>
</div>
<div className='col-8'>
<h4 className="my-4" style={{color:'black',fontSize: '56px', textAlign: 'center'}}> : فودافون كاش</h4>
</div>
                         </div>

                         <div className='row'>
<div className='col-4'>
<h4 className="my-4" style={{color:'black',fontSize: '56px', textAlign: 'center'}}>01224703104</h4>
</div>
<div className='col-8'>
<h4 className="my-4" style={{color:'black',fontSize: '56px', textAlign: 'center'}}> : أورنج كاش</h4>
</div>
                         </div>












	<br />
	<br />
                        <hr />
	<div className='row'>
<div className='col-12'>
	<img src="https://res.cloudinary.com/dvlnovdyu/image/upload/v1736366445/main_logo_h0dsxc.png" alt="E Commerce Logo" style={{width: "350px", height: "350px",display: 'block',margin: 'auto'}}/>
	</div>
	</div>
                    </div>
					
                    <div className="col-12 col-lg-7 order-details">
{/* <h2 className="my-5">رقم الأوردر {order._id}</h2> */}
	<div className='row'>
                         <div className='col-4'>
                         <h4 className="my-4">الإسم : </h4>
</div>
<div className='col-8'>
	<h2>{user && user.name}  </h2>
	</div>
                         </div>
<div className='row'>
                         <div className='col-4'>
                         <h4 className="my-4">رقم التليفون : </h4>
</div>
<div className='col-8'>
	<h2>{shippingInfo && shippingInfo.phoneNo} </h2>
	</div>
                         </div>
<div className='row'>
                         <div className='col-4'>
                         <h4 className="my-4">العنوان : </h4>
</div>
<div className='col-8'>
	<h2><b></b> {shippingDetails}</h2>
	</div>
                         </div>
                        
                         {/* <h1 className="mb-4" style={{color:'black',fontSize: '44px'}}>عنوان التوصيل</h1> */}
                        
                        
                        {/* <h2  className="mb-4" style={{color:'black',fontSize: '44px'}}><b>السعر : </b> {totalPrice}</h2> */}

                        <hr />
                         <div className='row'>
                         <div className='col-3'>
                         <h4 className="my-4">عدد القطع</h4>

</div>
<div className='col-3'>
<h4 className="my-4">السعر</h4>
</div>
<div className='col-3'>
<h4 className="my-4">الصنف</h4>
</div>
<div className='col-3'>
<h4 className="my-4">الإجمالي</h4>
</div>
                         </div>
                         
                        <div className="cart-item my-1">
                        {orderItems && orderItems.map(item => (
                            <Fragment>
 <div key={item.product} className="cart-item my-1">
                            
                            <div className="row my-5">
                                <div className="col-3 col-lg-3 mt-4 mt-lg-0">
                                <h2 style={{textAlign:'center'}}>{item.quantity}</h2>
                                    {/* <p className="text-center"> {item.quantity} قطعة </p> */}
                                </div>
                                <div className="col-3 col-lg-3 mt-4 mt-lg-0">
                                <h2 style={{textAlign:'center'}}>{item.price}</h2>
                                    {/* <p>${item.price}</p> */}
                                </div>
                                <div className="col-3 col-lg-3">
                                    <h2 style={{textAlign:'center'}}>{item.name}</h2>
                                    {/* <Link to={`/product/${item.product}`}>{item.name}</Link> */}
                                </div>
                                <div className="col-3 col-lg-2">
                                <h2  className="mb-4" style={{textAlign:'center'}}>{parseFloat(item.price) * parseInt(item.quantity)}</h2>
                                {/* <img src={item.image} alt={item.name} height="45" width="65" /> */}
                                </div>
                            </div>
                           
                </div>
                     <hr />
                            </Fragment>
                           
                        ))}
                        </div>             
<div className='row'>
                         <div className='col-4'>
	
                         <h2 className="mb-4"><b>المجموع : </b></h2>

</div>
<div className='col-4'>

</div>
<div className='col-4'>
<h4 className="w-100" style={{textAlign: 'center'}}>{totalPrice}</h4>
</div>
                         </div>
                        <hr />
                    </div>
                    <div className="col-12 col-lg-3 mt-5">
                    <h4 className="my-4">خصم</h4>
                                    <div className="form-group">
                                    <input
                                    type="number"
                                    id="discount_field"
                                    className="form-control"
                                    name="discount"
                                    value={discount}
                                    onChange={(e)=> setDiscount(e.target.value)}
                                    />
                                    </div>
                        <hr />
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
