import { ALL_NOTIFICATIONS_REQUEST,
    ALL_NOTIFICATIONS_SUCCESS,
     ALL_NOTIFICATIONS_FAIL,
     NOTIFICATION_DETAILS_REQUEST,
     NOTIFICATION_DETAILS_SUCCESS,
     NOTIFICATION_DETAILS_FAIL,

     ADMIN_NOTIFICATIONS_REQUEST,
     ADMIN_NOTIFICATIONS_SUCCESS,
     ADMIN_NOTIFICATIONS_FAIL,


     NEW_NOTIFICATION_REQUEST,
     NEW_NOTIFICATION_SUCCESS,
     NEW_NOTIFICATION_RESET,
     NEW_NOTIFICATION_FAIL,


     DELETE_NOTIFICATION_REQUEST,
     DELETE_NOTIFICATION_SUCCESS,
     DELETE_NOTIFICATION_RESET,
     DELETE_NOTIFICATION_FAIL,


     UPDATE_NOTIFICATION_REQUEST,
     UPDATE_NOTIFICATION_SUCCESS,
     UPDATE_NOTIFICATION_RESET,
     UPDATE_NOTIFICATION_FAIL,

      CLEAR_ERRORS
}  from '../constants/notificationConstants';

let initialState = {
    notifications: [],
    users: [],
    loading: false,
    notificationsCount: 0,
    error: null,
    notification: {},
    isUpdated: false
}
export const notificationsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_NOTIFICATIONS_REQUEST:
        case ADMIN_NOTIFICATIONS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                notifications: []
            });

        case ADMIN_NOTIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                notifications: action.payload
            });

        case ALL_NOTIFICATIONS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                notifications: action.payload.notifications,
                count: action.payload.count,
            });
        case ALL_NOTIFICATIONS_FAIL:
        case ADMIN_NOTIFICATIONS_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        case DELETE_NOTIFICATION_REQUEST:
        case UPDATE_NOTIFICATION_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                notification: {}
            });
        case DELETE_NOTIFICATION_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isDeleted: action.payload
            });
        case UPDATE_NOTIFICATION_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isUpdated: action.payload,
                notifications: action.payload.notifications
            });
        case DELETE_NOTIFICATION_FAIL:        
        case UPDATE_NOTIFICATION_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case DELETE_NOTIFICATION_RESET:
            return Object.assign({}, state, {
                isDeleted: false
            });
        case UPDATE_NOTIFICATION_RESET:
            return Object.assign({}, state, {
                isUpdated: false
            });
        default:
            return state;
    }
    
}

// export const productDetailsReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case PRODUCT_DETAILS_REQUEST:
//             return Object.assign({}, state, {
//                 loading: true,
//                 product: {}
//             });
//         case PRODUCT_DETAILS_SUCCESS:
//             return Object.assign({}, state, {
//                 loading: false,
//                 product: action.payload.product,
//             });
//         case PRODUCT_DETAILS_FAIL:
//             return Object.assign({}, state, {
//                 loading: false,
//                 error: action.payload
//             });
//         case CLEAR_ERRORS:
//             return Object.assign({}, state, {
//                 error: null
//             });
//         default:
//             return state;
//     }
// }


export const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_NOTIFICATION_REQUEST:
        case UPDATE_NOTIFICATION_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                notification: {}
            });
        case DELETE_NOTIFICATION_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isDeleted: action.payload
            });
        case UPDATE_NOTIFICATION_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isUpdated: action.payload
            });
        case DELETE_NOTIFICATION_FAIL:        
        case UPDATE_NOTIFICATION_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case DELETE_NOTIFICATION_RESET:
            return Object.assign({}, state, {
                isDeleted: false
            });
        case UPDATE_NOTIFICATION_RESET:
            return Object.assign({}, state, {
                isUpdated: false
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}
