import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { getProductReviews, deleteReview, clearErrors} from '../../actions/productActions'

import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ProductReviews = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [productId, setProductId] = useState('')
    const { loading , error, reviews } = useSelector(state => state.productReviews)
    const { isDeleted } = useSelector(state => state.deleteReview)


    // const { error: deleteError, isDeleted } = useSelector(state => state.product)
    // const [data, setData]= useState(setOrders())
    useEffect(()=>{
        // dispatch(allUsers())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success("Review Deleted Successully!")
            dispatch({ type: DELETE_REVIEW_RESET})
        }

        // , isDeleted
        if(productId !== ''){
            dispatch(getProductReviews(productId))
        }
    },[dispatch, alert, error, history, isDeleted, productId])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }
    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                },
            ],
            rows: []
        }
        reviews.forEach(review => {
            data.rows = data.rows.concat ({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions: 
                <Fragment>
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-danger py-2 px-3" onClick={()=> deleteReviewHandler(review._id)}>
                        {/*  onClick={()=> deleteReviewHandler(user._id)} */}
                        <i className="fa fa-trash"></i>
                        </button>
                    </div>
                    </div>
                       
                </Fragment>
                
                
            })
           
        });
            return data
    }
    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId))

    }
    return (
        <Fragment>
        <MetaData title={'All Reviews'} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                <div className="row justify-content-center mt-5">
			<div className="col-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="productId_field">Enter Product ID</label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        className="form-control"
                                        value={productId}
                                        onChange={(e)=> setProductId(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                >
                                    SEARCH
								</button>
                            </ form>
                        </div>
            
        </div>
        <br />
        <hr />
        <br />
        {reviews && reviews.length > 0 ? (
             <Fragment>
                 {loading ? <Loader /> : (
                <MDBDataTable
                data={setReviews()}
                className="px-3"
                bordered
                striped
                hover
                responsive
                />
)}
             </Fragment>
            
        ): (
            <p className="mt-5 text-center">No Reviews To Show</p>
        )}
                    
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default ProductReviews
