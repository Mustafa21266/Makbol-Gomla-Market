import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { allOrders, clearErrors, deleteOrder} from '../../actions/orderActions'

import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading , error, orders } = useSelector(state => state.allOrders)
    const { isDeleted } = useSelector(state => state.order)
    // const { error: deleteError, isDeleted } = useSelector(state => state.product)
    // const [data, setData]= useState(setOrders())
    useEffect(()=>{
        dispatch(allOrders())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        // if(deleteError){
        //     alert.error(deleteError)
        //     dispatch(clearErrors())
        // }
        if(isDeleted){
            alert.success("Order Deleted Successully!")
            dispatch({ type: DELETE_ORDER_RESET})
            history.push('/admin/orders')
        }

        // , deleteError, isDeleted
    },[dispatch, alert, error, history, isDeleted])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                },
            ],
            rows: []
        }
        orders.forEach(order => {
            data.rows = data.rows.concat ({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ? <p style={{color: 'green'}}>{order.orderStatus}</p> : <p style={{color: 'red'}}>{order.orderStatus}</p> ,
                actions: 
                <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2"><i className="fa fa-eye"></i></Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=> deleteOrderHandler(order._id)}>
                        {/*  */}
                        <i className="fa fa-trash"></i>
                        </button>
                </Fragment>
                
                
            })
           
        });
            return data
    }
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }
    return (
        <Fragment>
        <MetaData title={'All Orders'} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5">All Orders</h1>
                    {loading ? <Loader /> : (
                        <MDBDataTable
                        data={setOrders()}
                        className="px-3"
                        bordered
                        striped
                        hover
                        />
        )}
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default OrdersList
