import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser, clearErrors } from './actions/userActions'
import store from './store'
import { useEffect, useState } from 'react';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrder from './components/order/ListOrder';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';

import AccountingsList from './components/admin/AccountingsList';
import NewAccounting from './components/admin/NewAccounting';
import UpdateAccounting from './components/admin/UpdateAccounting';

import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import Search from './components/layout/Search';

import { getNotifications } from './actions/notificationActions';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(async () => {
    await store.dispatch(loadUser())
    
    store.dispatch(clearErrors())
   
    async function getStripeApiKey(){
      // const { data } = await axios.get('http://127.0.0.1:3000/api/v1/stripeapi')
      // setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  }, [])
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  setInterval(async function () {
    await store.dispatch(getNotifications())
  }, 30000);
  return (
    <Router>
        <div className="App">
          <div className='container-fluid'>
              <Route path="/" component={Header} />
          {/* <Header /> */}
              <img className="fade-in-image animate__animated animate__fadeIn" src="./images/peter-bond-KfvknMhkmw0-unsplash.jpg" alt="homepage picture"/>
          <div className="container container-fluid">
              <Route path="/" component={Home} exact />
              <Route path="/search/:keyword" component={Home} />
              <Route path="/login" component={Login} exact/>
              <Route path="/register" component={Register} exact/>
              <Route path="/password/forgot" component={ForgotPassword} exact/>
              <Route path="/password/reset/:token" component={NewPassword}/>
              <Route path="/cart" component={Cart} exact/>
             <ProtectedRoute path="/order/confirm/:id" component={ConfirmOrder} exact/>
              <ProtectedRoute path="/shipping" component={Shipping} exact/>
              <ProtectedRoute path="/orders/me" component={ListOrder} exact/>
              <ProtectedRoute path="/order/:id" component={OrderDetails} exact/>

              <ProtectedRoute path="/success" component={OrderSuccess} exact/>
              {stripeApiKey && 
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute path="/payment" component={Payment} exact/>
              </Elements>
              }
              <ProtectedRoute path="/me" component={Profile} exact/>
              <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
              <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
              <Route path="/product/:id" component={ProductDetails} exact />
              
          </div>
              <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>

              <ProtectedRoute path="/admin/accounting" isAdmin={true} component={NewAccounting} exact/>
              <ProtectedRoute path="/admin/accountings" isAdmin={true} component={AccountingsList} exact/>
              <ProtectedRoute path="/admin/accounting/:id" isAdmin={true} component={UpdateAccounting} exact/>

              <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact/>
              <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
              <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>
              <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact/>
              <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact/>
              <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact/>
              <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact/>
              <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact/>
              {/* && (!isAuthenticated || user.role !== 'admin') */}
              <Footer />
              {/* {!loading && (
                
              )} */}
        </div>
        </div>
    </Router>
    
  );
}

export default App;
