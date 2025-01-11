import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { allAccountings, deleteAccounting, clearErrors} from '../../actions/accountingActions'

import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import { DELETE_ACCOUNTING_SUCCESS } from '../../constants/accountingConstants'
const AccountingsList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading , error, accountings } = useSelector(state => state.accountings)
    const { error: deleteError, isDeleted } = useSelector(state => state.accounting)
    // const [data, setData]= useState(setOrders())
    useEffect(()=>{
        dispatch(allAccountings())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted){
            alert.success("! تم إلغاء الحساب")
            dispatch({ type: DELETE_ACCOUNTING_SUCCESS})
            history.push('/admin/accountings')
        }
    },[dispatch, alert, error, deleteError, isDeleted])

    const setAccountings = () => {
        const data = {
            columns: [
                {
                    label: 'العميل',
                    field: 'name',
                    sort: 'asc'
                }
                ,
                {
                    label: 'دفعة',
                    field: 'receivables',
                    sort: 'asc'
                },
                {
                    label: 'مرتجع',
                    field: 'returns',
                    sort: 'asc'
                },
                {
                    label: 'التاريخ',
                    field: 'createdAt',
                    sort: 'asc'
                },
                {
                    label: 'خيارات',
                    field: 'actions'
                },
            ],
            rows: []
        }
        accountings.forEach(accounting => {
            data.rows = data.rows.concat ({
                name: accounting.user.name,
                receivables: accounting.receivables,
                returns: accounting.returns,
                createdAt: String(accounting.createdAt).substring(0, 10),
                actions: 
                <Fragment>
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <Link to={`/admin/accounting/${accounting._id}`} className="btn btn-primary py-2 px-3"><i className="fa fa-pencil"></i></Link>
                    </div>
                    
                        
                    </div>
                    <hr />
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-danger py-2 px-3" onClick={()=> deleteAccountHandler(accounting._id)}>
                    <img src="./images/circle-x.png" alt="Circle X Delete" style={{width: "85px", height: "85px"}}/>
                        </button>
                    </div>
                    </div>
                 
                </Fragment>
                
                
            })
           
        });
            return data
    }
    const deleteAccountHandler = (id) => {
        dispatch(deleteAccounting(id))
    }
    return (
        <Fragment>
        <MetaData title={'All Accountings'} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5 animate__animated animate__fadeIn" style={{padding:'15px', display: 'block',margin: 'auto'}}>كل الحسابات</h1>
                    <hr />
                    {loading ? <Loader /> : (
                        <MDBDataTable
                        data={setAccountings()}
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

export default AccountingsList
