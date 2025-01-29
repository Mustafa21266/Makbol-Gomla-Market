import axios from 'axios';
import { ALL_NOTIFICATIONS_REQUEST,
    ALL_NOTIFICATIONS_SUCCESS,
     ALL_NOTIFICATIONS_FAIL,
     NOTIFICATION_DETAILS_REQUEST,
     NOTIFICATION_DETAILS_SUCCESS,
     NOTIFICATION_DETAILS_FAIL,


     DELETE_NOTIFICATION_REQUEST,
     DELETE_NOTIFICATION_SUCCESS,
     DELETE_NOTIFICATION_FAIL,


     UPDATE_NOTIFICATION_REQUEST,
     UPDATE_NOTIFICATION_SUCCESS,
     UPDATE_NOTIFICATION_FAIL,

      CLEAR_ERRORS
}  from '../constants/notificationConstants';

export const getNotifications = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_NOTIFICATIONS_REQUEST,
            payload: []
        })
        let link = `/api/v1/notifications`
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_NOTIFICATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_NOTIFICATIONS_FAIL,
            payload: error.response.statusText
        })
    }
}


export const getNotificationDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: NOTIFICATION_DETAILS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/notification/${id}`)
        dispatch({
            type: NOTIFICATION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NOTIFICATION_DETAILS_FAIL,
            payload: error.response.statusText
        })
    }
}


//Update Product for ADMINS
export const updateNotification = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_NOTIFICATION_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`/api/v1/admin/notification/${id}` , config)
        dispatch({
            type: UPDATE_NOTIFICATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_NOTIFICATION_FAIL,
            payload: error.response.statusText
        })
    }
}



//Delete product FOR ADMINS
export const deleteNotification = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_NOTIFICATION_REQUEST,
            payload: []
        })
        const { data } = await axios.delete(`/api/v1/admin/notification/${id}`)
        dispatch({
            type: DELETE_NOTIFICATION_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_NOTIFICATION_FAIL,
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