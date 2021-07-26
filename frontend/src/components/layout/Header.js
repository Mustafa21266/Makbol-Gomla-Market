import React, { Fragment, useState, useEffect } from 'react'
import '../../App.css';
import Search from './Search';
import { Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'
const Header = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const alert = useAlert()
  useEffect(() => {

  },[])
  const logOutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfullly')
  }
    return (
        <Fragment>
            <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/" >
          <img src="./images/logo.png" alt="E Commerce Logo"/>
          </Link>
         
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
           <Route render={( { history } ) =>  <Search  history={history}/> } />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      <Link to="/cart" style={{ textDecoration: 'none' }}>

        <span className="ml-1" id="cart_count">{cartItems.length}</span>
              <span id="cart" className="ml-2"><svg width="20" height="20" style={{marginBottom: 5}} fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></span>
        </Link>
        { user ? (
          <div className="ml-4 dropdown d-inline"> 
                <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <figure className="avatar avatar-nav">
                    <img src={user.avatar && user.avatar.url} alt={user && `${user.name} Avatar`} className="rounded-circle"></img>
                  </figure>
                  <span >{user && user.name}</span>
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                  {user && user.role === 'admin' && (
                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                  )}
                <Link to="/orders/me" className="dropdown-item">Orders</Link>
                <Link to="/me" className="dropdown-item">Profile</Link>
                <Link to="/" className="dropdown-item text-danger" onClick={logOutHandler}>Logout</Link>
                  </div> 
          </div> 
        ) : !loading &&  <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
       

      </div> 
    </nav>
        </Fragment>
    )
}

export default Header
