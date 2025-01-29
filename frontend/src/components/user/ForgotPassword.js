import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'

const ForgotPassword = ( { history })  => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert()
    const { error, message, loading } = useSelector(state => state.forgotPassword)
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
    },[dispatch, alert,error, history, message ])
    async function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('email',email)
        await dispatch(forgotPassword(formData));
        alert.success(message);
        history.push('/login')
    }
    return (
        <Fragment>
            <MetaData title={'نسيت كلمة المرور'} />
            <div className="row wrapper animate__animated animate__fadeIn">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3" style={{display: 'block',margin: 'auto'}}>نسيت كلمة المرور</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">أدخل البريد الألكتروني</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={ loading ? true: false}
                            >
                            إرسال
                    </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword
