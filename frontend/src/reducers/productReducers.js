import { ALL_PRODUCTS_REQUEST,
     ALL_PRODUCTS_SUCCESS,
      ALL_PRODUCTS_FAIL,
      PRODUCT_DETAILS_REQUEST,
      PRODUCT_DETAILS_SUCCESS,
      PRODUCT_DETAILS_FAIL,


      NEW_REVIEW_REQUEST,
      NEW_REVIEW_SUCCESS,
      NEW_REVIEW_RESET,
      NEW_REVIEW_FAIL,


      ADMIN_PRODUCTS_REQUEST,
      ADMIN_PRODUCTS_SUCCESS,
      ADMIN_PRODUCTS_FAIL,


      NEW_PRODUCT_REQUEST,
      NEW_PRODUCT_SUCCESS,
      NEW_PRODUCT_RESET,
      NEW_PRODUCT_FAIL,


      DELETE_PRODUCT_REQUEST,
      DELETE_PRODUCT_SUCCESS,
      DELETE_PRODUCT_RESET,
      DELETE_PRODUCT_FAIL,

      UPDATE_PRODUCT_REQUEST,
      UPDATE_PRODUCT_SUCCESS,
      UPDATE_PRODUCT_RESET,
      UPDATE_PRODUCT_FAIL,

      GET_REVIEWS_REQUEST,
      GET_REVIEWS_SUCCESS,
      GET_REVIEWS_RESET,
      GET_REVIEWS_FAIL,



      DELETE_REVIEW_REQUEST,
      DELETE_REVIEW_SUCCESS,
      DELETE_REVIEW_RESET,
      DELETE_REVIEW_FAIL,


       CLEAR_ERRORS
}  from '../constants/productConstants';

let initialState = {
    products: [],
    users: [],
    loading: false,
    productsCount: 0,
    error: null,
    product: {}
}
export const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                products: []
            });

        case ADMIN_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                products: action.payload
            });

        case ALL_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultsPerPage: action.payload.resultsPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            });
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            console.log(action.payload)
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

export const productDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                product: {}
            });
        case PRODUCT_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                product: action.payload.product,
            });
        case PRODUCT_DETAILS_FAIL:
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



export const newReviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_REVIEW_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                product: {}
            });
        case NEW_REVIEW_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                success: action.payload,
            });
        case NEW_REVIEW_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case NEW_REVIEW_RESET:
            return Object.assign({}, state, {
                success: false
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}



//GET Reviews ADMIN ONLY
export const productReviewsReducer = (state = { reviews: []}, action) => {
    switch(action.type) {
        case GET_REVIEWS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                reviews: []
            });
        case GET_REVIEWS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                reviews: action.payload,
            });
        case GET_REVIEWS_FAIL:
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



export const newProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                product: {}
            });
        case NEW_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            });
        case NEW_PRODUCT_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case NEW_PRODUCT_RESET:
            return Object.assign({}, state, {
                success: false
            });
        case CLEAR_ERRORS:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}



export const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                product: {}
            });
        case DELETE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isDeleted: action.payload
            });
        case UPDATE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isUpdated: action.payload
            });
        case DELETE_PRODUCT_FAIL:        
        case UPDATE_PRODUCT_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case DELETE_PRODUCT_RESET:
            return Object.assign({}, state, {
                isDeleted: false
            });
        case UPDATE_PRODUCT_RESET:
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

export const deleteReviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_REVIEW_REQUEST:
            return Object.assign({}, state, {
                loading: true,
            });
        case DELETE_REVIEW_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isDeleted: action.payload,
            });
        case DELETE_REVIEW_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });
        case DELETE_REVIEW_RESET:
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