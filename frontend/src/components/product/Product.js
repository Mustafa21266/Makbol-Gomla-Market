import React from 'react'
import { Link } from 'react-router-dom'
const Product = ( { product, col } ) => {
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
            <span id="no_of_reviews">({product.numOfReviews} تقييمات)</span>
          </div>
          <p className="card-text" style={{color: 'black !important',textAlign: 'right'}}>يباع بواسطة  : {product.seller}</p>
          <p className="card-text" style={{color: 'black !important',textAlign: 'center'}}>السعر : {product.price} EGP</p>
          <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">إظهار التفاصيل</Link>
          
        </div>
      </div>
        </Link>
    </div>
    )
}

export default Product
