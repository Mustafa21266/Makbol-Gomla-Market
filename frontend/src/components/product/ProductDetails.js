import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors, newReview } from '../../actions/productActions'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Carousel  } from 'react-bootstrap'
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET,}  from '../../constants/productConstants';
import ListReviews from '../review/ListReviews'
const ProductDetails = ( { match } ) => {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch();
    const { loading, product, error } = useSelector(state => state.productDetails)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)
    const alert = useAlert()
    useEffect(() => {
        
        if(error){
            alert.error(error)
            dispatch(clearErrors())
          }
          if(reviewError){
            alert.error(error)
            dispatch(clearErrors())
          }
          if(success){
            alert.success("تم إضافة التقييم ! شكرا لك !")
            dispatch({ type: NEW_REVIEW_RESET, payload : {}})
          }
          dispatch(getProductDetails(match.params.id));
    },[dispatch, alert,error, reviewError, match.params.id, success ])
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
        dispatch(addItemToCart(match.params.id, quantity))
        alert.success('تم إضافة المنتج في سلة التسوق')
    }
    const setUserRatings = () => {
        const stars = document.querySelectorAll('.star')
        stars.forEach((star, index) => {
            star.starValue = index +  1;
            ['click', 'mouseover', 'mouseout'].forEach((e) => {
                star.addEventListener(e, showRatings)
            })
            function showRatings(e){
                stars.forEach((star, index) => {
                    if(e.type === 'click') {
                        if(index < this.starValue){
                            star.classList.add('orange')
                            setRating(this.starValue)
                        }else {
                            star.classList.remove('orange')
                        }
                    }
                    if(e.type === 'mouseover') {
                        if(index < this.starValue){
                            star.classList.add('yellow')
                        }else {
                            star.classList.remove('yellow')
                        }
                    }
                    if(e.type === 'mouseout') {
                        star.classList.remove('yellow')
                    }
                })
            }
        })
    }
    const reviewHandler = () => {
        const formData = new FormData()
        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('productId', match.params.id)
        dispatch(newReview(formData))

    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
 <div className="row f-flex justify-content-around  animate__animated animate__fadeIn">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                {/* <img src="https://i5.walmartimages.com/asr/1223a935-2a61-480a-95a1-21904ff8986c_1.17fa3d7870e3d9b1248da7b1144787f5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff" alt="sdf" height="500" width="500">
            </img> */}
            <Carousel pause="hover">
                {product.images && product.images.map(image => (
                    <Carousel.Item key={image.public_id} >
                        <img className="d-block w-100" src={image.url} alt={product.name}></img>
                    </Carousel.Item>
                ))}
            </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">منتج # {product._id}</p>

                <hr></hr>

                <div className="rating-outer" style={{margin: '2px'}} >
                    <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%`}}></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews}) تقييمات </span>

                <hr></hr>

                <p id="product_price">{product.price} EGP</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" style={{padding: '10px 20px'}} onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" style={{padding: '10px 20px'}} onClick={increaseQty}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn d-inline ml-4" disabled={product.stock === 0}  style={{backgroundColor:'#178a53', color: 'white'}}  onClick={addToCart}>إضافة إلى السلة</button>

                 <hr></hr>

                <p>المخزون : <span id="stock_status" className={product.stock > 0 ? 'greenColor':'redColor'}>{product.stock > 0 ? 'متوفر':'غير متوفر'}</span></p>

                <hr></hr>

                <h4 className="mt-2">وصف المنتج</h4>
                <p>{product.description}</p>
                <hr></hr>
                <p id="product_seller mb-3">يباع بواسطة : <strong>{product.seller}</strong></p>
				{user ? (
                    <button id="review_btn" type="button" className="btn mt-4" style={{backgroundColor:'#178a53'}} data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                           إرسل تقيم
                </button>
                ):(
                    <div className="alert alert-danger mt-5 text-center" type="alert">
                        سجل دخولك للتقييم
                    </div>
                )}
				
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">إرسال التقييم</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                        <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" value={comment} onChange={(e) => setComment(e.target.value)} className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-black" style={{ borderRadius: '25px'}} data-dismiss="modal" aria-label="Close" onClick={reviewHandler}>تأكيد</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        { product.reviews && product.reviews.length > 0 && (<ListReviews reviews={product.reviews}/>)}
</Fragment>
            )}

        </Fragment>
           
    )
}

export default ProductDetails
