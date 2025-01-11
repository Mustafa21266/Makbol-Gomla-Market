import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
const Login = ( { history, location } ) => {
    const [email, setEmail] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const { loading, user, error, isAuthenticated } = useSelector(state => state.auth)
    const alert = useAlert()
    const redirect = location.search ? `/${location.search.split('=')[1]}`:'/'
    useEffect(() => {
        if(isAuthenticated){
            history.push(redirect)
        }
        if(error){
            return alert.error(error)
            dispatch(clearErrors())
          }
        //   dispatch(getProductDetails(match.params.id));
    },[dispatch, alert,error, isAuthenticated, history ])
    function submitHandler(e){
        e.preventDefault();
        dispatch(login(phoneNo, password));
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'تسجيل الدخول'} />
                    <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3" style={{display: 'block',margin: 'auto'}}>تسجيل الدخول</h1>
            <div className="form-group">
              <label htmlFor="phoneNo_field" style={{float: 'right'}}>رقم التليفون</label>
              <input
                type="phoneNo"
                id="phoneNo_field"
                className="form-control"
                value={phoneNo}
                onChange={(e)=> setPhoneNo(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field" style={{float: 'right'}}>كلمة المرور</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">هل نسيت كلمة المرور ؟</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              تسجيل الدخول
            </button>

            <Link to="/register" className="float-right mt-3">مستخدم جديد ؟</Link>
          </form>
		  </div>
    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default Login
