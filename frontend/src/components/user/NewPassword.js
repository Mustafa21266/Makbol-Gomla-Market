import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearErrors } from '../../actions/userActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';

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
        // if(isUpdated){
        //     alert.success('Password updated successfully!');
        //     history.push('/me')
        //     dispatch({
        //         type: UPDATE_PASSWORD_RESET
        //     })
        // }
        //   dispatch(getProductDetails(match.params.id));
    },[dispatch, alert,error, history, success ])
    async function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('password',password)
        formData.set('confirmPassword',confirmPassword)
        await dispatch(resetPassword(match.params.token,formData));
        if(success){
            alert.success('Password updated successfully');
            history.push('/login')
        }
        
    }
    return (
        <Fragment>
            <MetaData title={'Reset Password'} />
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
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
                        <label htmlFor="confirm_password_field">Confirm Password</label>
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
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default NewPassword
