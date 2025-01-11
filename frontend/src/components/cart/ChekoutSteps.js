import React from 'react'
import { Link } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
const ChekoutSteps = ({ shipping, confirmOrder, payment}) => {
    const { user } = useSelector(state => state.auth)
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5 animate__animated animate__backInLeft">
            {shipping ? <Link to="/shipping" className="float-right">
                <div className="triangle2-active">

                </div>
                <div className="step active-step">
عنوان التوصيل
                </div>
                <div className="triangle-active">

                </div>
            </Link>: <Link to="!#" disabled >
            <div className="triangle2-incomplete">

</div>
<div className="step incomplete">
عنوان الشحن
</div>
<div className="triangle-incomplete">

</div>
                </Link>}

                {confirmOrder ? <Link to={`/order/${order._id}/confirm`} className="float-right">
                <div className="triangle2-active">

                </div>
                <div className="step active-step">
تأكيد الأوردر
                </div>
                <div className="triangle-active">

                </div>
            </Link>: <Link to="!#" disabled >
            <div className="triangle2-incomplete">

</div>
<div className="step incomplete">
تأكيد الأوردر
</div>
<div className="triangle-incomplete">

</div>
                </Link>}


                {payment ? <Link to="/payment" className="float-right">
                <div className="triangle2-active">

                </div>
                <div className="step active-step">
الدفع
                </div>
                <div className="triangle-active">

                </div>
            </Link>: <Link to="!#" disabled >
            <div className="triangle2-incomplete">

</div>
<div className="step incomplete">
الدفع
</div>
<div className="triangle-incomplete">

</div>
                </Link>}

        </div>
    )
}

export default ChekoutSteps
