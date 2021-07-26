import React, { Fragment, useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
const Profile = () => {
    const { user, loading } = useSelector(state => state.auth)
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />
                    <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row mt-5 user-info  animate__animated animate__fadeIn">
            <div className="col-12 col-md-4">
                <figure className='avatar avatar-profile' style={{display: 'block', margin: "auto"}}>
                    <img className="rounded-circle img-fluid"  src={user.avatar.url} alt={`${user.name} Avatar`} />
                </figure>
                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-8">
                 <h4>Full Name</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.email}</p>

                 <h4>Joined On</h4>
                 <p>{String(user.createdAt).substring(0, 10)}</p>
                 {user.role !== 'admin' && (
                    <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>
                 )}
                 

                <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
