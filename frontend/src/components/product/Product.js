import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../actions/cartActions'
import { useAlert } from 'react-alert'
import AddToCartUtil from './AddToCartUtil'
const Product = ( { product, col } ) => {
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
        <AddToCartUtil key={product._id} product={product}  col={4} />
    </div>
    )
}

export default Product
