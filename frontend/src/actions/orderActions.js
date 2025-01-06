import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,


    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,


    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,



    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,


    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

    CLEAR_ERRORS
}  from '../constants/orderConstants';
import axios from 'axios';

//Create a new order
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`/api/v1/order/new`, order,config)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.statusText
        })
    }
}


//update order
export const updateOrder = (id, orderData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ORDER_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData,config)
        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.statusText
        })
    }
}



//delete order
export const deleteOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_ORDER_REQUEST,
            payload: []
        })
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.statusText
        })
    }
}


//Get currently logged in user Orders
export const myOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDERS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/orders/me`)
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.statusText
        })
    }
}



//Get all orders -ADMIN
export const allOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/admin/orders`)
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.statusText
        })
    }
}


//Get order details
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.statusText
        })
    }
}



//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
        payload: []
    })
}