import React, { Fragment } from 'react'

const ListReviews = ({ reviews }) => {
    return (
        <Fragment>
            <div className="reviews w-75 animate__animated animate__fadeIn">
                <h3>Other's Reviews: <span style={{fontWeight: 400}}>({reviews.length})</span></h3>
                <hr />
            { reviews && reviews.map(review => (
                
                    <div key={review._id} className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width: `${review.rating / 5 * 100}%`}}></div>
                        </div>
                        <p className="review_user">by {review.name} on {review.createdAt && review.createdAt.substring(0,10)}</p>
                        <p className="review_comment">{review.comment}</p>
    
                        <hr />
                    </div>
            
            ))}
            </div>
        </Fragment>
    )
}

export default ListReviews
