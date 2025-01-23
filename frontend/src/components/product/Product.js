import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../actions/cartActions'
import { useAlert } from 'react-alert'
const Product = ( { product, col } ) => {
      const [quantity, setQuantity] = useState(1)
      const dispatch = useDispatch();
      const alert = useAlert()
      const addToCart = (id) => {
              dispatch(addItemToCart(id, quantity))
              alert.success('تم إضافة المنتج في سلة التسوق')
          }
          const decreaseQty = (id, quantity) => {
              const newQty = quantity - 1;
              if(newQty <= 0) return;
              dispatch(addItemToCart(id, newQty))
      
          }
          const increaseQty = (id, quantity, stock) => {
              const newQty = quantity + 1;
              if(newQty > stock) return;
              dispatch(addItemToCart(id, newQty))
          }
    return (
        // <div className={`col-sm-10 col-md-6 col-lg-${col} my-3 d-inline-block mx-auto`}>
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
            {/* <span id="no_of_reviews">({product.numOfReviews} تقييمات)</span> */}
          </div>
          {/* <p className="card-text" style={{color: 'black !important',textAlign: 'right'}}>يباع بواسطة  : {product.seller}</p> */}
          <div className='w-100 d-block mx-auto'>
          <h4 className='w-100 d-block mx-auto' style={{textAlign: 'center', color: 'black'}}>السعر : {product.price} EGP</h4>
          </div>
          {/* <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">إظهار التفاصيل</Link> */}
        </div>
      </div>
        </Link>
        <hr></hr>
                 <div className='row'>
                  <div className='col-12 w-100 d-block mx-auto'>
                  <div className="stockCounter w-100 d-flex justify-content-center mx-auto">
                    {/* <span className="btn btn-danger minus" style={{padding: '10px 20px'}} onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" style={{padding: '10px 20px'}} onClick={increaseQty}>+</span> */}
                                                    <span className="btn minus"  style={{padding: '10px 20px',backgroundColor:'red'}}  onClick={ () => decreaseQty(product._id, product.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

								<span className="btn btn-primary plus" style={{padding: '10px 20px'}}  onClick={() => increaseQty(product._id, product.quantity, product.stock)}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn d-block mx-auto" disabled={product.stock === 0}  style={{backgroundColor:'#178a53', color: 'white'}}  onClick={addToCart}>إضافة إلى السلة</button>

                  </div>
                 </div>
    </div>
    )
}

export default Product
