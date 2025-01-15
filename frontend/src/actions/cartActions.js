import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO
}  from '../constants/cartConstants';
import axios from 'axios';
//ADD TO CART

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/product/${id}`)
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0] ? data.product.images[0].url: '',
                stock: data.product.stock,
                quantity
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//REMOVE FROM CART
export const removeFromCart = (id) => async (dispatch, getState) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data
        })
        localStorage.setItem('shippingInfo', JSON.stringify(data))
}