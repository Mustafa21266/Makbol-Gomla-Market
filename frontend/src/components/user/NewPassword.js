import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'

const NewPassword = ({ history, match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert()
    const { error, success, loading } = useSelector(state => state.forgotPassword)
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
    },[dispatch, alert,error, history, success ])
    async function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('password',password)
        formData.set('confirmPassword',confirmPassword)
        await dispatch(resetPassword(match.params.token,formData));
        if(success){
            alert.success('ََ! تم تغيير كلمة المرور');
            history.push('/login')
        }
        
    }
    return (
        <Fragment>
            <MetaData title={'إعادة تغيير كلمة المرور'} />
            <div className="row wrapper animate__animated animate__fadeIn">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3" style={{display: 'block',margin: 'auto'}}>كلمة المرور الجديدة</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">كلمة المرور</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">تأكيد كلمة المرور</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={ loading ? true: false}
                        >
                        حفظ
                    </button>

                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default NewPassword
