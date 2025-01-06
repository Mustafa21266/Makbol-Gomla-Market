import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors, register } from '../../actions/userActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';

const Register = ( { history } ) => {
    const [user, setUser] = useState({
        name: '',
        phoneNo: '',
        email: '',
        password: '',

    })
    const { name, email, phoneNo, password } = user;
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('./images/logo.png')
    // const [password, setPassword] = useState('')
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
        //   dispatch(getProductDetails(match.params.id));
    },[dispatch, alert,error, isAuthenticated, history ])
    function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name)
        formData.set('phoneNo',phoneNo)
        formData.set('email',email)
        formData.set('password',password)
        // formData.set('avatar',avatar)
        dispatch(register(formData));
    }
    const onChange = e => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatar(reader.result)
                    setAvatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
            document.getElementsByClassName('custom-file-label')[0].innerHTML = e.target.files[0].name
            // e.target.placeholder = e.target.value
            // console.log(e.target.value)
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
            <label htmlFor="name_field">الأسم</label>
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
              <label htmlFor="phoneNo_field">رقم التليفون</label>
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
              <label htmlFor="password_field">كلمة المرور</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            {/* <div className='form-group'>
              <label htmlFor='avatar_upload'>صورة الحساب</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={avatarPreview}
                              className='rounded-circle'
                              alt='Avatar Preview'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          accept="images/*"
                          onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'  style={{textAlign: 'left'}}>
                          إختر صورة الحساب
                      </label>
                  </div>
              </div>
          </div> */}
  
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
