import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'
import { UPDATE_USER_RESET } from '../../constants/userConstants'

const UpdateUser = ({ history, match }) => {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch();
    const { error, isUpdated, loading } = useSelector(state => state.user)
    const { user } = useSelector(state => state.userDetails)
    const userId = match.params.id
    useEffect(() => {
        if(user && user._id !== userId){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name);
            setPhoneNo(user.phoneNo);
            setEmail(user.email);
            setRole(user.role);
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
        if(isUpdated){
            alert.success('تم تحديث بيانات العميل');
            history.push('/admin/users')
            dispatch({
                type: UPDATE_USER_RESET
            })
        }
        //   dispatch(getProductDetails(match.params.id));
    },[dispatch, alert,error, history,user , isUpdated ])
    async function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name)
        formData.set('phoneNo',phoneNo)
        formData.set('email',email)
        formData.set('role',role)
        await dispatch(updateUser(user._id,formData));
        // alert.success('User updated successfully!');
        // history.push('/admin/users')
        //     dispatch({
        //         type: UPDATE_USER_RESET
        // })
    }
    return (
        <Fragment>
        <MetaData title={`Update User # ${user && user._id}`} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5" style={{padding:'15px', display: 'block',margin: 'auto'}}>تحديث بيانات العميل</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">الأسم</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNo_field">رقم التليفون</label>
                            <input
                                type="phoneNo"
                                id="phoneNo_field"
                                className="form-control"
                                name='phoneNo'
                                value={phoneNo}
                                onChange={(e)=> setPhoneNo(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">البريد الإلكتروني</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="role_field">نوع الحساب</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e)=> setRole(e.target.value)}
                                    >
                                        <option value="user">عادي</option>
                                        <option value="admin">أدمن</option>
                                    </select>
                                </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >تحديث</button>
                    </form>
                </div>
            </div>
                        </Fragment>
                        )}
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default UpdateUser
