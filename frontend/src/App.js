import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import './components/layout/addToHomeScreen.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import GettingStarted from './components/GettingStarted';
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
import { getNotifications } from './actions/notificationActions';
import ScrollToTop from "./components/layout/ScrollToTop";

// import AddToHomeScreen from './components/layout/AddToHomeScreen';
import { useAddToHomescreenPrompt } from "./components/layout/AddToHomeScreen";
import POS from './components/admin/POS';

function App() {
  const domainList = [
    "https://mokbel-gomla-market-08529c6a328e.herokuapp.com/",
    "https://www.makbol-gomla.store/",
    "http://localhost:3000/"
  ]
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  useEffect(async () => {
    await store.dispatch(loadUser())
    
    store.dispatch(clearErrors())
  }, [])
  setInterval(async function () {
    await store.dispatch(getNotifications())
  }, 30000);
  return (
    <Router>
      
        <ScrollToTop />
        <div className="App fadeInUp-animation">
            <div className='row'>
          <div className='col-12 d-flex justify-content-center animate__animated animate__bounce animate__delay-2.5s' style={{padding: '20px'}}>
          <button onClick={promptToInstall} style={{backgroundColor:'#178a53'}} className="btn text-white">تثبيت التطبيق <i className="fa fa-download"></i></button>
          </div>

        </div>
        {!domainList.includes(window.location.href) && (<Route path="/" component={Header} />) }
       
          {/* <Header /> */}
              <img className="fade-in-image animate__animated animate__fadeIn" src="https://res.cloudinary.com/dvlnovdyu/image/upload/v1736887007/peter-bond-KfvknMhkmw0-unsplash_siptnz.jpg" alt="homepage picture"/>
          <div className="container container-fluid">
              <Route path="/" component={GettingStarted} exact />
              <Route path="/home" component={Home} exact />
              <Route path="/search/:keyword" component={Home} />
              <Route path="/search/:subcategory/:category" component={Home} />
              <Route path="/login" component={Login} exact/>
              <Route path="/register" component={Register} exact/>
              <Route path="/seller/register" component={Register} exact/>
              <Route path="/password/forgot" component={ForgotPassword} exact/>
              <Route path="/password/reset/:token" component={NewPassword}/>
              <Route path="/cart" component={Cart} exact/>
             <ProtectedRoute path="/order/confirm/:id" component={ConfirmOrder} exact/>
              <ProtectedRoute path="/shipping" component={Shipping} exact/>
              <ProtectedRoute path="/orders/me" component={ListOrder} exact/>
              <ProtectedRoute path="/order/:id" component={OrderDetails} exact/>

              <ProtectedRoute path="/success" component={OrderSuccess} exact/>
              <ProtectedRoute path="/payment" component={Payment} exact/>
              <ProtectedRoute path="/me" component={Profile} exact/>
              <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
              <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
              <Route path="/product/:id" component={ProductDetails} exact />
              
          </div>
              <ProtectedRoute path="/admin/pos" isAdmin={true} component={POS} exact/>
              <ProtectedRoute path="/seller/dashboard" isSeller={true} component={Dashboard} exact/>
              <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>

              <ProtectedRoute path="/admin/accounting" isAdmin={true} component={NewAccounting} exact/>
              <ProtectedRoute path="/admin/accountings" isAdmin={true} component={AccountingsList} exact/>
              <ProtectedRoute path="/admin/accounting/:id" isAdmin={true} component={UpdateAccounting} exact/>

              <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact/>
              <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
              <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>


              <ProtectedRoute path="/seller/products" isSeller={true} component={ProductsList} exact/>
              <ProtectedRoute path="/seller/product" isSeller={true} component={NewProduct} exact/>
              <ProtectedRoute path="/seller/product/:id" isSeller={true} component={UpdateProduct} exact/>


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
                {/* <AddToHomeScreen /> */}
    </Router>
    
  );
}

export default App;
