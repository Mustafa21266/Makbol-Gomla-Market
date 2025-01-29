import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../../actions/userActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'

const Register = ( { history } ) => {
    let stateObj = {}
    if(window.location.href.includes("/seller/register")){
        stateObj = {
            name: '',
            phoneNo: '',
            role: 'seller',
            email: '',
            password: '',
        }
    }else {
        stateObj = {
            name: '',
            phoneNo: '',
            role: 'user',
            email: '',
            password: '',
        }
    }
    const [user, setUser] = useState(stateObj)
    const { name, email, phoneNo, password } = user;
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)
    const alert = useAlert()
    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
    },[dispatch, alert,error, isAuthenticated, history ])
    function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name)
        formData.set('phoneNo',phoneNo)
        formData.set('email',email)
        formData.set('password',password)
        dispatch(register(formData));
    }
    const onChange = e => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    // setAvatar(reader.result)
                    // setAvatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
            document.getElementsByClassName('custom-file-label')[0].innerHTML = e.target.files[0].name
        }else {
            setUser({ ...user, [e.target.name]: [e.target.value] })
        }
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'تسجيل كمستخدم جديد'} />
                    <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-3" style={{display: 'block',margin: 'auto'}}>تسجيل كمستخدم جديد</h1>

          <div className="form-group">
            <label htmlFor="name_field"  style={{float: 'right'}}>الأسم</label>
            <input 
            type="name"
            id="name_field" 
            className="form-control" 
            name="name"
            value={name}
            onChange={onChange}
            />
          </div>

            <div className="form-group">
              <label htmlFor="phoneNo_field"  style={{float: 'right'}}>رقم التليفون</label>
              <input
                type="phoneNo"
                id="phoneNo_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={onChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field"  style={{float: 'right'}}>كلمة المرور</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={ loading ? true: false}
            >
              تسجيل
            </button>
          </form>
		  </div>
    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default Register
