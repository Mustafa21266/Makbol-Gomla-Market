import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { allUsers, clearErrors, deleteUser} from '../../actions/userActions'

import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import { DELETE_USER_RESET } from '../../constants/userConstants'
const UsersList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading , error, users } = useSelector(state => state.allUsers)
    const { isDeleted } = useSelector(state => state.user)


    // const { error: deleteError, isDeleted } = useSelector(state => state.product)
    // const [data, setData]= useState(setOrders())
    useEffect(()=>{
        dispatch(allUsers())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        // if(deleteError){
        //     alert.error(deleteError)
        //     dispatch(clearErrors())
        // }



        if(isDeleted){
            alert.success("تم إلغاء المستخدم")
            dispatch({ type: DELETE_USER_RESET})
            history.push('/admin/users')
        }

        // 
    },[dispatch, alert, error, isDeleted, history])

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'الإسم',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'رقم التليفون',
                    field: 'phoneNo',
                    sort: 'asc'
                },
                {
                    label: 'نوع الحساب',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'خيارات',
                    field: 'actions'
                },
            ],
            rows: []
        }
        users.forEach(user => {
            data.rows = data.rows.concat ({
                id: user._id,
                name: user.name,
                phoneNo: user.phoneNo,
                role: user.role && String(user.role).includes('admin') ? "أدمن" : "عميل" ,
                actions: 
                <Fragment>
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-2 px-3"><i className="fa fa-pencil"></i></Link>
                    </div>
                    </div>
                    <hr />
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-danger py-2 px-3" onClick={()=> deleteUserHandler(user._id)} style={{color: "white"}}>
                        x
                        </button>
                    </div>
                    </div>
                       
                  
                </Fragment>
                
                
            })
           
        });
            return data
    }
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))

    }
    return (
        <Fragment>
        <MetaData title={'All Users'} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5 animate__animated animate__fadeIn" style={{padding:'15px', display: 'block',margin: 'auto'}}>كل المستخدمين</h1>
                    <hr />
                    {loading ? <Loader /> : (
                        <MDBDataTable
                        data={setUsers()}
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

export default UsersList
