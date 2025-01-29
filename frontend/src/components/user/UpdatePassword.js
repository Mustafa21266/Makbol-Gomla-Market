import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const UpdatePassword = ( { history } ) => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert()
    const { error, isUpdated, loading } = useSelector(state => state.auth)
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
    },[dispatch, alert,error, history, isUpdated ])
    async function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword',oldPassword)
        formData.set('password',password)
        formData.set('token',localStorage.getItem('token'))
        await dispatch(updatePassword(formData));
        alert.success('! تم تغيير كلمة المرور');
            history.push('/me')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
    }
    return (
        <Fragment>
            <MetaData title={'تغيير كلمة المرور'} />
            <div className="row wrapper animate__animated animate__fadeIn">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mt-2 mb-5" style={{display: 'block',margin: 'auto'}}>تغيير كلمة المرور</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">كلمة المرور القديمة</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">كلمة المرور الجديدة</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={ loading ? true: false}>حفظ</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
