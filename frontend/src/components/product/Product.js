import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../actions/cartActions'
import { useAlert } from 'react-alert'
const Product = ( { product, col } ) => {
      const [quantity, setQuantity] = useState(1)
      const dispatch = useDispatch();
      const alert = useAlert();
      const decreaseQty = (id) => {
        const count = document.getElementById(id)
        if(count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }
      const increaseQty = (id) => {
              const count = document.getElementById(id)
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
        <div className={`col my-3 d-inline-block mx-auto`}>
        <Link to={`/product/${product._id}`}>
      <div className="card p-3 rounded w-100">
        <img
          className="card-img-top img-fluid mx-auto"
          src={product.images[0].url}
          alt={`${product.name}`}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{color: 'black'}}>
           {product.name}
          </h5>
          <div className="ratings">
            <div className="rating-outer" style={{display: 'block'}}>
              <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%`}}></div>
            </div>
          </div>
          <div className='w-100 d-block mx-auto'>
          <h4 className='w-100 d-block mx-auto' style={{textAlign: 'center', color: 'black'}}>السعر : {product.price} EGP</h4>
          </div>
        </div>
      </div>
        </Link>
        <hr></hr>
                 <div className='row'>
                  <div className='col-12 w-100 d-block mx-auto'>
                  <div className="stockCounter d-flex justify-content-center">
                    <span className="btn btn-danger minus" style={{padding: '10px 20px'}} onClick={() => decreaseQty(`key${product._id}`)}>-</span>

                    <input id={`key${product._id}`} type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" style={{padding: '10px 20px'}} onClick={() => increaseQty(`key${product._id}`)}>+</span>
                </div>
                  </div>
                 <hr></hr>
                  <div className='col-12 w-100 d-flex justify-content-center' style={{marginTop: '20px'}}>
                 
                 <button type="button" id="cart_btn" className="btn d-inline ml-4" disabled={product.stock === 0}  style={{backgroundColor:'#178a53', color: 'white'}}  onClick={addToCart}>إضافة إلى السلة</button>
                  </div>

                 </div>
    </div>
    )
}

export default Product
