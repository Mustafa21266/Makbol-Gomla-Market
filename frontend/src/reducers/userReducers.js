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

let initialState = {
   users: [],
   loading: false,
   error: null,
   user: {},
   isAuthenticated: false,
   isUpdated: false
}
export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                isAuthenticated: false
            });
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                user: action.payload.user,
                isAuthenticated: true
            });
        case LOAD_USER_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                user: null
            });
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                user: null
            });

        case LOGOUT_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isAuthenticated: false,
                user: null
            });
        case LOGOUT_USER_FAIL:
            return Object.assign({}, state, {
                error: action.payload
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}


export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return Object.assign({}, state, {
                loading: true,
            });
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isUpdated: action.payload,
            });
        case DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isDeleted: action.payload,
            });
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload,
            });
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return Object.assign({}, state, {
                isUpdated: false
            });
        case DELETE_USER_RESET:
            return Object.assign({}, state, {
                isDeleted: false
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}



export const forgotPasswordReducer = (state = initialState, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                error: null,
                loading: true
            });
        case FORGOT_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                message: action.payload,
                loading: false
            });
        case NEW_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                success: action.payload,
                loading: false
            });
        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}

export const allUsersReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_USERS_REQUEST:
            return Object.assign({}, state, {
                error: null,
                loading: true
            });
        case ALL_USERS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                users: action.payload
            });
        case ALL_USERS_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}


export const userDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                error: null,
                loading: true
            });
        case USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                user: action.payload
            });
        case USER_DETAILS_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}