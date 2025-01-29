import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { saveShippingInfo } from '../../actions/cartActions'
import { countries } from 'countries-list';
import ChekoutSteps from './ChekoutSteps'
import { allUsers } from '../../actions/userActions'
const Shipping = ({ history}) => {
    const { shippingInfo } = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingInfo.address ? shippingInfo.address:'');
    const [city, setCity] = useState(shippingInfo.city ? shippingInfo.city:'');
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode ? shippingInfo.postalCode:'55555');
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo ? shippingInfo.phoneNo:'');
    const [country, setCountry] = useState(shippingInfo.country ? shippingInfo.country:'الإسكندرية');
    const { user } = useSelector(state => state.auth)
    const [orderUser, setOrderUser] = useState(user.name ? user.name:'');
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
    },[dispatch, alert])
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
