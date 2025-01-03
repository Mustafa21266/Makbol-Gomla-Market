import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { createAccounting, clearErrors} from '../../actions/accountingActions'
import { NEW_ACCOUNTING_RESET } from '../../constants/accountingConstants'
import Sidebar from './Sidebar'
import { allUsers } from '../../actions/userActions'

const NewAccounting = ({ history }) => {
    
    const [receivables, setReceivables] = useState(0);
    const [returns, setReturns] = useState(0);
    const [user, setUser] = useState('');
    const { users } = useSelector(state => state.allUsers)
     const dispatch = useDispatch();
      const alert = useAlert();
      const { loading , error, success } = useSelector(state => state.newAccounting)
      // const [data, setData]= useState(setOrders())
      useEffect(()=>{
          if(error){
              alert.error(error)
              dispatch(clearErrors())
          }
          if(success){
            history.push('/admin/accountings')
            alert.success('Accounting Created Successully!')
            dispatch({ type: NEW_ACCOUNTING_RESET})
        }
      },[dispatch, alert, error, success, history])

      function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('receivables',receivables)
        formData.set('returns',returns)
        formData.set('user',user)
        dispatch(createAccounting(formData));
    }
  
    return (
        <Fragment>
       <MetaData title={'حساب جديد'} />
        <div className="row animate__animated animate__fadeIn  animate__delay-1s">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                <div className="wrapper my-5"> 
                <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4" style={{display: 'block',margin: 'auto',textAlign: 'center'}}>إنشاء حساب جديد</h1>
                    <div className="form-group select-editable">
                            <label htmlFor="user_field">صاحب الحساب</label>
                            <select
                               id="user_field"
                                className="form-control"
                                name="user"
                                value={user}
                                onChange={(e)=> 
                                    setUser(e.target.value)
                                }
                                required
                            >
                                
                                {users.map(user => (
                                <option key={user.name} value={user.name}>
                                   {user.name}
                                    </option>
                                ))}
                            </select>
                        </div> 

            <div className="form-group">
                <label htmlFor="receivables_field">دفعات</label>
                <input
                  type="number"
                  id="receivables_field"
                  className="form-control"
                  name="receivables"
                  value={receivables}
                  onChange={(e)=> setReceivables(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="returns_field">مرتجعات</label>
                <input
                  type="number"
                  id="returns_field"
                  className="form-control"
                  name="returns"
                  value={returns}
                  onChange={(e)=> setReturns(e.target.value)}
                />
              </div>

            <button
              id="accounting_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              تأكيد
            </button>
 
          </form>
    </div>
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default NewAccounting
