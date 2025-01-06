import { 
    CREATE_ACCOUNTING_REQUEST,
    CREATE_ACCOUNTING_SUCCESS,
    CREATE_ACCOUNTING_FAIL,

    MY_ACCOUNTINGS_REQUEST,
    MY_ACCOUNTINGS_SUCCESS,
    MY_ACCOUNTINGS_FAIL,


    ACCOUNTING_DETAILS_REQUEST,
    ACCOUNTING_DETAILS_SUCCESS,
    ACCOUNTING_DETAILS_FAIL,


    UPDATE_ACCOUNTING_REQUEST,
    UPDATE_ACCOUNTING_SUCCESS,
    UPDATE_ACCOUNTING_RESET,
    UPDATE_ACCOUNTING_FAIL,



    DELETE_ACCOUNTING_REQUEST,
    DELETE_ACCOUNTING_SUCCESS,
    DELETE_ACCOUNTING_RESET,
    DELETE_ACCOUNTING_FAIL,


    ALL_ACCOUNTINGS_REQUEST,
    ALL_ACCOUNTINGS_SUCCESS,
    ALL_ACCOUNTINGS_FAIL,

    CLEAR_ERRORS
}  from '../constants/accountingConstants';
import axios from 'axios';

//Create a new accounting
export const createAccounting = (accounting) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ACCOUNTING_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`/api/v1/accounting/new`, accounting,config)
        dispatch({
            type: CREATE_ACCOUNTING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ACCOUNTING_FAIL,
            payload: error.response.statusText
        })
    }
}


//update accounting
export const updateAccounting = (id, accountingData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ACCOUNTING_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`/api/v1/admin/accounting/${id}`, accountingData,config)
        dispatch({
            type: UPDATE_ACCOUNTING_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ACCOUNTING_FAIL,
            payload: error.response.statusText
        })
    }
}



//delete accounting
export const deleteAccounting = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_ACCOUNTING_REQUEST,
            payload: []
        })
        const { data } = await axios.delete(`/api/v1/admin/accounting/${id}`)
        dispatch({
            type: DELETE_ACCOUNTING_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ACCOUNTING_FAIL,
            payload: error.response.statusText
        })
    }
}


//Get currently logged in user Orders
export const myAccountings = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ACCOUNTINGS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/accountings/me`)
        dispatch({
            type: MY_ACCOUNTINGS_SUCCESS,
            payload: data.accountings
        })
    } catch (error) {
        dispatch({
            type: MY_ACCOUNTINGS_FAIL,
            payload: error.response.statusText
        })
    }
}



//Get all orders -ADMIN
export const allAccountings = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ALL_ACCOUNTINGS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/admin/accountings`)
        dispatch({
            type: ALL_ACCOUNTINGS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ACCOUNTINGS_FAIL,
            payload: error.response.statusText
        })
    }
}


//Get accounting details
export const getAccountingDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNTING_DETAILS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/accounting/${id}`)
        dispatch({
            type: ACCOUNTING_DETAILS_SUCCESS,
            payload: data.accounting
        })
    } catch (error) {
        dispatch({
            type: ACCOUNTING_DETAILS_FAIL,
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