import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../actions/cartActions'
import { useAlert } from 'react-alert'
const AddToCartUtil = ( { product, col } ) => {
      const [quantity, setQuantity] = useState(1)
      const dispatch = useDispatch();
      const alert = useAlert();
      const decreaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);

    }
      const increaseQty = () => {
              const count = document.querySelector('.count')
              if(count.valueAsNumber >= product.stock) return;
              const qty = count.valueAsNumber + 1;
              setQuantity(qty);
          }
          const addToCart = () => {
              dispatch(addItemToCart(product._id, quantity))
              setQuantity(1)
              alert.success('تم إضافة المنتج في سلة التسوق')
          }
    return (
        <div className={`col d-block mx-auto`}>
            <hr></hr>
                 <div className='row'>
                  <div className='col-12 w-100 d-block mx-auto'>
                  <div className="stockCounter d-flex ">
                    <span className="btn btn-danger minus" style={{padding: '10px 20px'}} onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" style={{padding: '10px 20px'}} onClick={increaseQty}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn d-inline ml-4" disabled={product.stock === 0}  style={{backgroundColor:'#178a53', color: 'white'}}  onClick={addToCart}>إضافة إلى السلة</button>

                 <hr></hr>
                  </div>
                 </div>
    </div>
    )
}

export default AddToCartUtil
