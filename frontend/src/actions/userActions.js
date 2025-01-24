import axios from 'axios';
import { LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,


    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,


    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,


    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

    CLEAR_ERRORS
}  from '../constants/userConstants';


//Login
export const login = (phoneNo, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/login`, { phoneNo, password },config)
        localStorage.setItem('token', data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.statusText
        })
    }
}


//Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/register`, userData,config)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.statusText
        })
    }
}

//Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/me`, { token: localStorage.getItem('token') },config)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.statusText
        })
    }
}




//Log out User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`http://127.0.0.1:8000/api/v1/logout`)
        localStorage.removeItem('token')
        dispatch({
            type: LOGOUT_USER_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.statusText
        })
    }
}


//Update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/me/update`, userData,config)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.statusText
        })
    }
}



//Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/password/update`, passwords,config)
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.statusText
        })
    }
}



//Forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/password/forgot`,  email,config)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.statusText
        })
    }
}


//Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PASSWORD_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/password/reset/${token}`,  passwords,config)
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.statusText
        })
    }
}

//Load ALL Users ADMIN ONLY
export const allUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/admin/users`)
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.statusText
        })
    }
}




//Update user ADMIN ONLY
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/admin/user/${id}`,  userData,config)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.statusText
        })
    }
}


//Get user details ADMIN ONLY
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:8000/api/v1/admin/user/${id}`, { token: localStorage.getItem('token')} ,config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.statusText
        })
    }
}


//delete user ADMIN ONLY
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/v1/admin/user/delete/${id}`, { token: localStorage.getItem('token')} ,config)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
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