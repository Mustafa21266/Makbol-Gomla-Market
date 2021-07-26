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
            setEmail(user.email);
            setRole(user.role);
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
        if(isUpdated){
            alert.success('User updated successfully!');
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
                        <h1 className="mt-2 mb-5">Update User</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
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
                            <label htmlFor="email_field">Email</label>
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
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e)=> setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
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
