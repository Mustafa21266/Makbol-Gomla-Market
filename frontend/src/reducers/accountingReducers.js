import { 
    CREATE_ACCOUNTING_REQUEST,
    CREATE_ACCOUNTING_SUCCESS,
    CREATE_ACCOUNTING_FAIL,

    MY_ACCOUNTINGS_REQUEST,
    MY_ACCOUNTINGS_SUCCESS,
    MY_ACCOUNTINGS_FAIL,

    ALL_ACCOUNTINGS_REQUEST,
    ALL_ACCOUNTINGS_SUCCESS,
    ALL_ACCOUNTINGS_FAIL,

    UPDATE_ACCOUNTING_REQUEST,
    UPDATE_ACCOUNTING_SUCCESS,
    UPDATE_ACCOUNTING_RESET,
    UPDATE_ACCOUNTING_FAIL,


    DELETE_ACCOUNTING_REQUEST,
    DELETE_ACCOUNTING_SUCCESS,
    DELETE_ACCOUNTING_RESET,
    DELETE_ACCOUNTING_FAIL,

    ACCOUNTING_DETAILS_REQUEST,
    ACCOUNTING_DETAILS_SUCCESS,
    ACCOUNTING_DETAILS_FAIL,

    CLEAR_ERRORS
}  from '../constants/accountingConstants';


let initialState = {
    accountings: [],
    users: [],
    loading: false,
    accountingsCount: 0,
    error: null,
    accounting: {},
    success: false
}

export const newAccountingReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_ACCOUNTING_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case CREATE_ACCOUNTING_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                accounting: action.payload.accounting,
                success: true
            });
        case CREATE_ACCOUNTING_FAIL:
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


export const myAccountingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case MY_ACCOUNTINGS_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case MY_ACCOUNTINGS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                success: true,
                accountings: action.payload
            });
        case MY_ACCOUNTINGS_FAIL:
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


export const allAccountingsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_ACCOUNTINGS_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case ALL_ACCOUNTINGS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                accountings: action.payload.accountings,
                totalReceivables: action.payload.totalReceivables,
                totalReturns: action.payload.totalReturns
            });
        case ALL_ACCOUNTINGS_FAIL:
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




export const accountingDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACCOUNTING_DETAILS_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });
        case ACCOUNTING_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                accounting: action.payload
            });
        case ACCOUNTING_DETAILS_FAIL:
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

export const accountingReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_ACCOUNTING_REQUEST:
        case DELETE_ACCOUNTING_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                product: {}
            });
        case UPDATE_ACCOUNTING_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isUpdated: action.payload
            });  
        case DELETE_ACCOUNTING_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isDeleted: action.payload
            });    
        case UPDATE_ACCOUNTING_FAIL:
        case DELETE_ACCOUNTING_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case UPDATE_ACCOUNTING_RESET:
            return Object.assign({}, state, {
                isUpdated: false
            });
        case DELETE_ACCOUNTING_RESET:
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