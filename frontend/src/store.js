import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer,productDetailsReducer, newReviewReducer, newProductReducer, productReducer, productReviewsReducer, deleteReviewReducer } from './reducers/productReducers';
import { notificationsReducer } from './reducers/notificationReducers';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers' 
import { newAccountingReducer, myAccountingsReducer, allAccountingsReducer, accountingDetailsReducer, accountingReducer } from './reducers/accountingReducers'
const reducer = combineReducers({
    notifications: notificationsReducer,
    products: productsReducer,
    accountings: allAccountingsReducer,
    productDetails: productDetailsReducer,
    accountingDetails: accountingDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    myAccountings: myAccountingsReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    newAccounting: newAccountingReducer,
    product: productReducer,
    accounting: accountingReducer,
    allOrders: allOrdersReducer,
    allAccountings: allAccountingsReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    deleteReview: deleteReviewReducer
})


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')): {},
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;