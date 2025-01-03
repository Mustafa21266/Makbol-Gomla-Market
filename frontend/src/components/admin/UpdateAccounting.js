import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { updateAccounting, getAccountingDetails, clearErrors} from '../../actions/accountingActions'
import { UPDATE_ACCOUNTING_RESET } from '../../constants/accountingConstants'
import Sidebar from './Sidebar'

const UpdateAccounting = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading , error: updateError, isUpdated } = useSelector(state => state.accounting)
    const { error } = useSelector(state => state.accountingDetails)
    const { accountings } = useSelector(state => state.accountings)
    let filteredAccountings =  accountings.filter(accounting => accounting._id === match.params.id)
    const accounting = filteredAccountings[0]
    const [receivables, setReceivables] = useState(0);
    const [returns, setReturns] = useState(0);
    const [user, setUser] = useState('');
    const { users } = useSelector(state => state.allUsers)
    const accountingId = match.params.id  
    useEffect(() => {
            if(accounting && accounting._id !== accountingId){
                dispatch(getAccountingDetails(accountingId))
            }else {
                setReceivables(accounting.receivables);
                setReturns(accounting.returns);
                setUser(accounting.user.name)
            }
            if(error){
                alert.error(error)
                dispatch(clearErrors())
            }
            if(updateError){
                alert.error(updateError)
                dispatch(clearErrors())
            }
            if(isUpdated){
              history.push('/admin/accountings')
              alert.success('! تم تحديث بيانات الحساب')
              dispatch({ type: UPDATE_ACCOUNTING_RESET})
          }
            
        },[dispatch, error, alert, isUpdated, updateError, history, accounting, accountingId])

    function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('receivables',receivables)
        formData.set('returns',returns)
        formData.set('user',user)
        dispatch(updateAccounting(accounting._id,formData));
    }

        return (
          <Fragment>
         <MetaData title={'تعديل حساب'} />
          <div className="row">
               <div className="col-12 col-md-2">
                   <Sidebar />
              </div>
              <div className="col-12 col-md-10 animate__animated animate__fadeIn  animate__delay-1s">
                  <Fragment>
                  <div className="wrapper my-5"> 
                  <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mb-4" style={{display: 'block',margin: 'auto',textAlign: 'center'}}>تعديل حساب</h1>
                      <div className="form-group select-editable">
                              <label htmlFor="user_field">صاحب الحساب</label>
                              <input
                                  type="text"
                                  id="user_field"
                                  className="form-control"
                                  name="user"
                                  value={user}
                                  onChange={(e)=> 
                                      setUser(e.target.value)
                                  }
                                  required
                              />
                              <hr />
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

export default UpdateAccounting
