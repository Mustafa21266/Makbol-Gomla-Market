import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { saveShippingInfo } from '../../actions/cartActions'
import { Link } from 'react-router-dom'
import { countries } from 'countries-list';
import ChekoutSteps from './ChekoutSteps'
import { allUsers } from '../../actions/userActions'
const Shipping = ({ history}) => {
    const countriesList = Object.values(countries)
    const { shippingInfo } = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingInfo.address ? shippingInfo.address:'');
    const [city, setCity] = useState(shippingInfo.city ? shippingInfo.city:'');
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode ? shippingInfo.postalCode:'55555');
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo ? shippingInfo.phoneNo:'');
    const [country, setCountry] = useState(shippingInfo.country ? shippingInfo.country:'الإسكندرية');
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)
    const [orderUser, setOrderUser] = useState(user.name ? user.name:'');
    const { order } = useSelector(state => state.orderDetails)
    const { users } = useSelector(state => state.allUsers)
    const dispatch = useDispatch();
    const alert = useAlert();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, postalCode, phoneNo, country, user: orderUser}))
        history.push(`/order/confirm/${shippingInfo.user}`)
    }
    useEffect(() => {
        dispatch(allUsers())
        // if(error){
        //     alert.error(error)
        //     dispatch(clearErrors())
        // }
        
    },[dispatch, alert])
      console.log(users)
    return (
        <Fragment>
            <MetaData title={'معلومات التوصيل'} />
            <ChekoutSteps shipping/>
            <div className="row wrapper animate__animated animate__fadeIn">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4" style={{display: 'block',margin: 'auto',textAlign: 'center'}}>معلومات التوصيل</h1>
                        {user.role && String(user.role).includes('admin') ? <div className="form-group select-editable">
                            <label htmlFor="orderUser_field">صاحب الأوردر</label>
                            <input
                                type="text"
                                id="orderUser2_field"
                                className="form-control"
                                name="orderUser"
                                value={orderUser}
                                onChange={(e)=> 
                                    setOrderUser(e.target.value)
                                }
                                required
                            />
                            <hr />
                            <select
                               id="orderUser_field"
                                className="form-control"
                                name="orderUser"
                                value={orderUser}
                                onChange={(e)=> 
                                    setOrderUser(e.target.value)
                                }
                                required
                            >
                                
                                {users.map(user => (
                                <option key={user.name} value={user.name}>
                                   {user.name}
                                    </option>
                                ))}
                            </select>
                        </div> : ""
                        
                        }
                                    {/* <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='orderUser'
                                            value={orderUser}
                                            onChange={(e)=> setOrderUser(e.target.value)}
                                        >
                                            {users.map(user => (
                                                <option key={user._id} value={user.name}>{user.name}</option>
                    ))}
                                        </select>
                                    </div> */}
                        <div className="form-group">
                            <label htmlFor="address_field">العنوان</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                name="address"
                                value={address}
                                onChange={(e)=> setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">المنطقة</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                name="city"
                                value={city}
                                onChange={(e)=> setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">رقم التليفون</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                name="phoneNo"
                                value={phoneNo}
                                onChange={(e)=> setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="postal_code_field">الكود البريدى</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                name="postalCode"
                                value={postalCode}
                                onChange={(e)=> setPostalCode(e.target.value)}
                                required
                            />
                        </div> */}

                        {/* <div className="form-group">
                            <label htmlFor="country_field">البلد</label>
                            <select
                                id="country_field"
                                className="form-control"
                                name="country"
                                value={country}
                                onChange={(e)=> setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map(country => (
                                <option key={country.name} value={country.name}>
                                   {country.name}
                                    </option>
                                ))}
                                    

                            </select>
                        </div> */}

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            إستكمال
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping
