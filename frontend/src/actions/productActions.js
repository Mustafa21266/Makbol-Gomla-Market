import axios from 'axios';
import { ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
     ALL_PRODUCTS_FAIL,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAIL,

     NEW_REVIEW_REQUEST,
     NEW_REVIEW_SUCCESS,
     NEW_REVIEW_FAIL,


     ADMIN_PRODUCTS_REQUEST,
     ADMIN_PRODUCTS_SUCCESS,
     ADMIN_PRODUCTS_FAIL,


     NEW_PRODUCT_REQUEST,
     NEW_PRODUCT_SUCCESS,
     NEW_PRODUCT_FAIL,


     DELETE_PRODUCT_REQUEST,
     DELETE_PRODUCT_SUCCESS,
     DELETE_PRODUCT_FAIL,


     UPDATE_PRODUCT_REQUEST,
     UPDATE_PRODUCT_SUCCESS,
     UPDATE_PRODUCT_FAIL,

     GET_REVIEWS_REQUEST,
     GET_REVIEWS_SUCCESS,
     GET_REVIEWS_FAIL,


     DELETE_REVIEW_REQUEST,
     DELETE_REVIEW_SUCCESS,
     DELETE_REVIEW_FAIL,


      CLEAR_ERRORS
}  from '../constants/productConstants';

export const getProducts = (keyword = '',currentPage, price, category, subcategory, rating = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST,
            payload: []
        })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`
       if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}&category=${category}&subcategory=${subcategory}`
        }
        if(subcategory){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}&category=${category}&subcategory=${subcategory}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.statusText
        })
    }
}


export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCTS_REQUEST,
            payload: []
        })
        const { data } = await axios.get('/api/v1/admin/products')
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.statusText
        })
    }
}

//Get product reviews FOR ADMINS ONLY
export const getProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_REVIEWS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)
        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.statusText
        })
    }
}



export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
            payload: []
        })
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.statusText
        })
    }
}


export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`/api/v1/review`,reviewData , config)
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.statusText
        })
    }
}


//Delete review for ADMIN ONLY
export const deleteReview = (id, productId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REVIEW_REQUEST,
            payload: []
        })
        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.statusText
        })
    }
}






export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PRODUCT_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.post(`/api/v1/admin/product/new`,productData , config)
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.statusText
        })
    }
}





//Update Product for ADMINS
export const updateProduct = (id,productData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`,productData , config)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.statusText
        })
    }
}



//Delete product FOR ADMINS
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST,
            payload: []
        })
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/delete/${id}`,{ token: localStorage.getItem('token')} , config)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
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
