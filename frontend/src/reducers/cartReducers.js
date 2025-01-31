import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SAVE_SHIPPING_INFO
}  from '../constants/cartConstants';

let initialState = {
    products: [],
    users: [],
    loading: false,
    productsCount: 0,
    error: null,
    product: {},
    cartItems: [],
    shippingInfo: {}
}

export const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.product === item.product)
            if(isItemExist){
                return Object.assign({}, state, {
                    loading: false,
                    cartItems: state.cartItems.map(i =>i.product === isItemExist.product ? item : i)
                });
            }else {
                return Object.assign({}, state, {
                    loading: false,
                    cartItems: state.cartItems.concat(item)
                });
            }
        case REMOVE_FROM_CART:
            return Object.assign({}, state, {
                loading: false,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            });
        case CLEAR_CART:
            return Object.assign({}, state, {
                loading: false,
                cartItems: []
            });
        case SAVE_SHIPPING_INFO:
            return Object.assign({}, state, {
                loading: false,
                shippingInfo: action.payload
            });
        default:
            return state;
    }
    
}