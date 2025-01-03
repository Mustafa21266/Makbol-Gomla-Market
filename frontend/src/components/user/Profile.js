import React, { Fragment, useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { myAccountings } from '../../actions/accountingActions'
import { myOrders, clearErrors } from '../../actions/orderActions'
const Profile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector(state => state.auth)
    const { accountings } = useSelector(state => state.myAccountings)
    const { orders, loading, error } = useSelector(state => state.myOrders)
    let bills = 0
    let receivables = 0
    let returns = 0
    let filteredAccountings = []
    useEffect(()=>{
            dispatch(myAccountings())
            dispatch(myOrders())
            // let filteredAccountings =  accountings.filter(accounting => accounting.user._id === user._id)
            if(error){
                alert.error(error)
                dispatch(clearErrors())
            }
        },[dispatch, alert, error])
    console.log(accountings)
    for (let index = 0; index < accountings.length; index++) {
        receivables = receivables + accountings[index].receivables
        returns = returns + accountings[index].returns
        console.log(receivables)
        console.log(returns)
                
    }
    for (let index = 0; index < orders.length; index++) {
        bills = bills + orders[index].totalPrice
        console.log(bills)
    }
    
    // filteredAccountings
    const accounting = filteredAccountings[0]
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'حسابى'} />
                    <h2 className="mt-5 ml-5">حسابى</h2>
                    <div className="row" style={{padding: '0px 50px'}}>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">الفواتير<br /> <b>{orders && bills}</b></div>
                                        </div>
                                        {/* <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link> */}
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">الدفعات<br /> <b>{accountings && receivables}</b></div>
                                        </div>
                                        {/* <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link> */}
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">مرتجعات<br /> <b>{accountings && returns}</b></div>
                                        </div>
                                        {/* <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link> */}
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">صافي<br /> <b>{accountings && (bills - returns - receivables )}</b></div>
                                        </div>
                                        {/* <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
        <div className="row mt-5 user-info  animate__animated animate__fadeIn">
            <div className="col-12 col-md-4">
                <figure className='avatar avatar-profile' style={{display: 'block', margin: "auto"}}>
                    <img className="rounded-circle img-fluid"  src={user.avatar.url} alt={`${user.name} Avatar`} />
                </figure>
                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    تعديل بياناتي
                </Link>
            </div>
     
            <div className="col-12 col-md-8">
                 <h4>الأسم الكامل</h4>
                 <p>{user.name}</p>
     
                 <h4>البريد الإلكتروني</h4>
                 <p>{user.email}</p>

                 <h4>رقم التليفون</h4>
                 <p>{user.phoneNo}</p>

                 <h4>تاريخ تسجيل الحساب</h4>
                 <p>{String(user.createdAt).substring(0, 10)}</p>
                 {user.role !== 'admin' && (
                    <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                    أوردراتي
                </Link>
                 )}
                 

                <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                    تغيير كلمة المرور
                </Link>
            </div>
        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
