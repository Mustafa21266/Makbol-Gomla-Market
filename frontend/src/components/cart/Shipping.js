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
const Shipping = ({ history }) => {
    const countriesList = Object.values(countries)
    const { shippingInfo } = useSelector(state => state.cart)
    const [address, setAddress] = useState(shippingInfo.address ? shippingInfo.address:'');
    const [city, setCity] = useState(shippingInfo.city ? shippingInfo.city:'');
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode ? shippingInfo.postalCode:'');
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo ? shippingInfo.phoneNo:'');
    const [country, setCountry] = useState(shippingInfo.country ? shippingInfo.country:'');
    const dispatch = useDispatch();
    const alert = useAlert();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, postalCode, phoneNo, country}))
        history.push('/order/confirm')
    }
    return (
        <Fragment>
            <MetaData title={'Shipping Info'} />
            <ChekoutSteps shipping/>
            <div className="row wrapper animate__animated animate__fadeIn">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
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
                            <label htmlFor="city_field">City</label>
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
                            <label htmlFor="phone_field">Phone No</label>
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

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                name="postalCode"
                                value={postalCode}
                                onChange={(e)=> setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
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
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping
