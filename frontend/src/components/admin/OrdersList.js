import React, { Fragment, useEffect } from 'react'
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
    const { user } = useSelector(state => state.auth)
    let { orders } = useSelector(state => state.allOrders)
    const { loading , error } = useSelector(state => state.allOrders)
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
            alert.success("تم إلغاء الأوردر بنجاح")
            dispatch({ type: DELETE_ORDER_RESET})
            if(user.role === "admin"){
                history.push('/admin/orders')
            }else {
                history.push('/seller/orders')
            }
            // history.push('/admin/orders')
        }

        // , deleteError, isDeleted
    },[dispatch, alert, error, history, isDeleted])
    if(user.role === "seller"){
        orders = orders.filter(o => o.seller_id === user._id)
    }
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'عدد القطع',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'القيمة',
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
                    field: 'actions'
                },
            ],
            rows: []
        }
        orders.forEach(order => {
            data.rows = data.rows.concat ({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice}EGP`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ? <p style={{color: 'green', textAlign: 'center'}}>تم التوصيل</p> : String(order.orderStatus).includes('Processing') ? <p style={{color: 'red', textAlign: 'center'}}>تحت التأكيد</p> : <p style={{color: 'orange', textAlign: 'center'}}>جاري التوصيل</p> ,
                actions: 
                <Fragment>
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <Link to={user.role === "admin" ? `/admin/order/${order._id}` : `/seller/order/${order._id}`} className="btn btn-primary py-2 px-3"><i className="fa fa-eye"></i></Link>
                    </div>
                    </div>
                    <hr />
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-danger py-2 px-3" onClick={()=> deleteOrderHandler(order._id)} style={{color: "white"}}>
                        x
                        </button>
                    </div>
                    </div>
                       

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
        <MetaData title={'كل الأوردرات'} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5 animate__animated animate__fadeIn" style={{padding:'15px', display: 'block',margin: 'auto'}}>كل الأوردرات</h1>
                    <hr />
                    {loading ? <Loader /> : (
                        <MDBDataTable
                        data={setOrders()}
                        striped
                        bordered
                        small
                        noBottomColumns={true}
                        className="text-center mx-auto animate__animated animate__fadeIn  animate__delay-1s"
                        hover
                        responsive
                        />
        )}
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default OrdersList
