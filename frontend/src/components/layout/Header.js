import React, { Fragment, useState, useEffect, useRef } from 'react'
import '../../App.css';
import Search from './Search';
import { Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'
import { updateNotification } from '../../actions/notificationActions'
import { getNotifications } from '../../actions/notificationActions';
import { UPDATE_NOTIFICATION_RESET } from '../../constants/notificationConstants'

import NotificationSound from './notification.mp3';

const Header = () => {
  const dispatch = useDispatch();
  const {  error, isUpdated, notifications } = useSelector(state => state.notifications)
  const { loading, user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const audioPlayer = useRef(null);
  let notificationCount = 0;
  // const { notifications } = useSelector(state => state.notifications)
  const alert = useAlert()
  const playAudio = () => {
    audioPlayer.current.play();
  }
  useEffect(() => {
     dispatch(getNotifications())

    // if(notifications.length > 0){
    //             // dispatch(getProductDetails(productId))
    //   }else {
    //     // setName(product.name);
    //     // setPrice(product.price);
    //     // setDescription(product.description);
    //     // setSubCategory(product.subcategory);
    //     // setCategory(product.category);
    //     // setStock(product.stock);
    //     // setSeller(product.seller);
    //     // setOldImages(product.images);
    //         }
    //         if(error){
    //             alert.error(error)
    //             dispatch(clearErrors())
    //         }
    //         if(updateError){
    //             alert.error(updateError)
    //             dispatch(clearErrors())
    //         }
            if(isUpdated){
              // history.push('/admin/products')
              // alert.success('')
              dispatch({ type: UPDATE_NOTIFICATION_RESET})
          }
            
  },[dispatch, alert, isUpdated, error])
  const logOutHandler = () => {
    dispatch(logout());
    alert.success('تم تسجيل الخروج بنجاح')
  }
  const readNotificationHandler = (id) => {
    dispatch(updateNotification(id));
    
    // dispatch(getNotifications())
    // console.log(e)
    // alert.success('تم تسجيل الخروج بنجاح')
  }
  console.log(notifications)
  if(notifications.length > 0){
    for (let index = 0; index < notifications.length; index++) {
      if(notifications[index].isRead == false){
        notificationCount++;
        playAudio();
      }
    }
  }
    return (
        <Fragment>
            <nav className="navbar row">
      <div className="col-12 col-md-3 d-flex justify-content-center">
        <div>
          <Link to="/">
          <img src="./images/main_logo.png" alt="E Commerce Logo" style={{width: "100px", height: "100px"}}/>
          </Link>
         
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
           <Route render={( { history } ) =>  <Search  history={history}/> } />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

        { user ? (
          <div className="dropdown dropleft d-inline"> 
                <Link to="#!" style={{backgroundColor:'#178a53'}} className="btn text-white" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <figure className="avatar avatar-nav">
                    <img src={user.avatar && user.avatar.url} alt={user && `${user.name} Avatar`} className="rounded-circle"></img>
                  </figure>
                  <span >{user && user.name}</span>
                </Link>
                <div className="dropdown-menu dropdown-menu-left animate__animated animate__fadeIn"  style={{position: 'absolute',right: 0,top: 35,padding: '15px 0px'}} aria-labelledby="dropDownMenuButton">
                  {user && user.role === 'admin' && (
                    <div>
                    <Link to="/dashboard" className="dropdown-item text-center">لوحة التحكم</Link>
                    <hr />
                    </div>
                    
                  )}
                <Link to="/orders/me" className="dropdown-item text-center">الأوردرات</Link>
                <hr />
                <Link to="/me" className="dropdown-item text-center">حسابي</Link>
                <hr />
                <Link to="/" className="dropdown-item text-danger text-center" onClick={logOutHandler}>تسجيل الخروج</Link>
                  </div> 
          </div> 
        ) : !loading &&  <Link to="/login" className="btn ml-4" style={{backgroundColor:'#178a53',color: 'white'}} id="login_btn">تسجيل الدخول</Link>}
        {user && user.role === 'admin' && (
                           <div className="dropdown dropleft d-inline"> 
                           <Link to="#" style={{ textDecoration: 'none', backgroundColor:'#178a53' }} className="btn text-white" type="button" id="dropDownMenuButtonTwo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <span className="ml-1" id="cart_count">{notificationCount}</span>
                           <i className="fa fa-bell" aria-hidden="true"></i>
                           </Link>
                           <div className="dropdown-menu dropdown-menu-left animate__animated animate__fadeIn"  style={{position: 'absolute',right: -180,top: 35,padding: '25px 15px',width: '350px',height:'200px',overflowY: 'scroll'}} aria-labelledby="dropDownMenuButtonTwo">
                             {notifications && notifications.sort(function (a, b) { return a.isRead - b.isRead; }).map(item => {
                                if(item.product){
                                    return (<Fragment>
                                        <Link to={`/product/${item.product._id}`} onClick={(e)=> readNotificationHandler(item._id) } className="dropdown-item">
                                            <div key={item.product._id} className="row">
                                             <div className="col-sm-12 col-md-2 d-flex justify-content-center">
                                                    <img src={item.user.avatar.url} alt={item.user.name} style={{width: '50px', border: "1px solid black", height: '50px', borderRadius: "50%",margin: '15px'}} className="rounded-circle"></img>
                                </div>
               <div className="col-sm-12 col-md-10">
                        <p key={item.product._id} style={{fontSize: '12px', color: 'black',textAlign:'right',fontWeight: item.isRead === true ?  "300" : "bold"}}>
                                        تقييم جديد بواسطة :  <b>{item.user.name} على منتح : {item.product.name}</b>
                                  </p>
                               </div>
                           </div>
                                          <audio ref={audioPlayer} src={NotificationSound} />
                               </Link>
                                </Fragment>)
                                }
                                else {
                                    return (<Fragment>
                                        <Link to={`/admin/order/${item.order._id}`} onClick={(e)=> readNotificationHandler(item._id) } className="dropdown-item">
                                            <div key={item.order._id} className="row">
                                             <div className="col-sm-12 col-md-2 d-flex justify-content-center">
                                                    <img src={item.user.avatar.url} alt={item.user.name} style={{width: '50px', border: "1px solid black", height: '50px', borderRadius: "50%",margin: '15px'}} className="rounded-circle"></img>
                                </div>
               <div className="col-sm-12 col-md-10">
                        <p key={item.order._id} style={{fontSize: '12px', color: 'black',textAlign:'right',fontWeight: item.isRead === true ?  "300" : "bold"}}>
                                        أوردر جديد بواسطة :  <b>{item.user.name}</b>
                                  </p>
                               </div>
                           </div>
                                          <audio ref={audioPlayer} src={NotificationSound} />
                               </Link>
                                </Fragment>)}
                                
                            })}
                               </div>
                               <hr />
                             {/* <div className="w-100">
                             <p style={{textAlign: 'left'}}>: مجموع السلة<span className="order-summary-values">{cartItems.reduce((acc, item)=> (acc + item.quantity * item.price), 0).toFixed(2)} EGP</span></p>
                             </div> 
                             <Link to={'/cart'} className="btn w-100"  style={{backgroundColor:'#178a53'}} >إذهب إلى سلة التسوق</Link>
                             </div> */}
                             </div> 
                    
                  )}
                  
       <div className="dropdown dropleft d-inline"> 
                <Link to="/cart" style={{ textDecoration: 'none',backgroundColor:'#178a53' }} className="btn text-white" type="button" id="dropDownMenuButtonTwo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="ml-1" id="cart_count">{cartItems.length}</span>
                <span id="cart" className="ml-2"><svg width="20" height="20" style={{marginBottom: 5}} fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></span>
                </Link>
                <div className="dropdown-menu dropdown-menu-left animate__animated animate__fadeIn"  style={{position: 'absolute',right: -180,top: 35,padding: '25px 15px',width: '350px'}} aria-labelledby="dropDownMenuButtonTwo">
                  {cartItems && cartItems.map(item => (
                    <Fragment key={item._id}>
                      <Link to={`/product/${item.product}`} className="dropdown-item">
                      <div key={item.product} className="row">
                        <div className="col-3 d-flex justify-content-center">
                          <img src={item.image} alt={item.product} style={{width: '55px', height: '52px'}}/>
                        </div>
                        <div className="col-9">
                            <p className="text-left" style={{fontSize: '12px', color:"black"}}>{item.name}</p>
                          <p className="w-100" style={{marginLeft: '10px', color:"black"}}><span className="text-left"> {item.price} </span><span className="float-right" style={{margin: '0px 3px 3px'}}> ( {item.quantity} ) قطعة </span> EGP </p>
                        </div>
                    </div>
                    <hr />
                      </Link>
                    </Fragment>
                    
                  ))}
                  <div className="w-100">
                  <span style={{textAlign: 'right', color:"black"}}>
                  <h4 className="w-100 d-block mx-auto" style={{color: 'black',textAlign: 'center'}}>
                   مجموع السلة
                    </h4>
                    <span className="order-summary-values">{cartItems.reduce((acc, item)=> (acc + item.quantity * item.price), 0).toFixed(2)} EGP</span>
                    
                    </span>
                  <Link to={'/cart'} className="btn w-100"  style={{backgroundColor:'#178a53', color:"white"}} >إذهب إلى سلة التسوق</Link>
                  </div>
                  </div> 
          </div> 
          

      </div> 
    </nav>
        </Fragment>
    )
}

export default Header
