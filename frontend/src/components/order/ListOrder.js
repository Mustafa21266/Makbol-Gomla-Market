import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { myOrders, clearErrors } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
const ListOrder = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading , error, orders } = useSelector(state => state.myOrders)
    // const [data, setData]= useState(setOrders())
    useEffect(()=>{
        
        dispatch(myOrders())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'عدد القطع',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'الكمية',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'الحالة',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'خيارات',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        orders && orders.forEach(order => {
            data.rows = data.rows.concat ({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice} EGP`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ? <p style={{color: 'green'}}>تم التوصيل</p> : <p style={{color: 'red'}}>جاري التوصيل</p> ,
                actions: <div className="w-100 d-flex justify-content-center"><Link to={`/order/${order._id}`} className="btn btn-primary"><i className="fa fa-eye"></i></Link></div>
            })
           
        });
            return data
    }
    return (
        <Fragment>
            <MetaData title={'أوردراتي'} />
            <h1 className="my-5 animate__animated animate__fadeIn" style={{display: 'block',margin: 'auto'}}>أوردراتي</h1>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="row animate__animated animate__fadeIn" >
                            <div className="col-12">
                            <MDBDataTable
                data={setOrders()}
                className="px-3 
 animate__animated animate__fadeIn  animate__delay-1s"
                bordered
                striped
                hover
                responsive
                />
                            </div>
                    </div>
                </Fragment>
                
            )}
        </Fragment>
    )
}

export default ListOrder
