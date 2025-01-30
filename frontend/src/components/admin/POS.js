import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { getAdminProducts, clearErrors} from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { allUsers } from '../../actions/userActions'
import SidebarPOS from './SidebarPOS'
import Product from '../product/Product'
const POS = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, products, error  } = useSelector(state => state.products)
    const { user } = useSelector(state => state.auth)
    const { users } = useSelector(state => state.allUsers)
    let totalAmount= 0;
    const { orders, totalAmount: ta } = useSelector(state => state.allOrders)
    const [category, setCategory] = useState('');
    const categoriesx = [
        'مياه',
        'مشروبات بارده',
        'مشروبات مخصوصة',
        'مولتو',
        'مشروبات الطافة والرياضة',
        'آبس كريم',
        'شوكلاتة',
        'حلويات متنوعة',
        'بيسكويت',
        'كيكات',
        'نيسكافيه',
        'شيبسيهات وسناكس'
        ]
        const categories = [
        'Water',
        'Soft Drinks',
        'Speciality Drinks',
        'Molto',
        'Sports And Energy Drinks',
        'Ice Cream',
        'Chocolate',
        'Candy And Gums',
        'Biscuits',
        'Cakes',
        'Nescafe',
        'Chips And Snacks'
        ]
    if(user && user.role === "admin"){
        totalAmount = ta;
    }else {
        orders.forEach(order => {
            totalAmount += order.totalPrice
        })
    }
    // const [data, setData]= useState(setOrders())
    let outOfStockProducts = 0;
    products.forEach(c => {
        if(c.stock === 0){
            outOfStockProducts += 1
        }
    })
    useEffect(()=>{
        dispatch(getAdminProducts())
        dispatch(allOrders())
        if(!window.location.href.includes("/seller/dashboard")){
            dispatch(allUsers())
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error ])
    return (
        <Fragment>
            <div className="row">
                    <div className="col-12 col-md-2">
                        {/* <SidebarPOS /> */}
                    </div>
                    <div className="col-12 col-md-10">
                        <br />
                    <h1 className="my-4 animate__animated animate__fadeIn" style={{padding:'15px', display: 'block',margin: 'auto'}}>نقطة البيع</h1>
                    <hr />
                    <br />
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'نقطة البيع'} />
                            {/* <div className="row animate__animated animate__fadeIn animate__delay-1s">
                                <div className="col-xl-12 col-sm-12 mb-3" style={{padding: '0px 65px'}}>
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">المجموع 
                                                <br /> 
                                                <b>
                                                     {totalAmount && totalAmount.toFixed(2)}
                                                </b>
                                                <br /> 
                                                <b>
                                                     EGP
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="row  animate__animated animate__fadeIn animate__delay-2s" style={{padding: '0px 50px'}}>
                            {categories.map((category, index) => (
                                <div>
 <button class="btn btn-primary" type="button" data-bs-toggle={`collapse${index}`} data-bs-target={`#collapse${index}Example`} aria-expanded="false" aria-controls={`collapse${index}Example`}>
                                {categoriesx[categories.indexOf(category)]}
                                </button>
                        {/* // <option key={category} value={category}>{categoriesx[categories.indexOf(category)]}</option> */}
                                <div class="collapse" id={`collapse${index}Example`}>
                                <div class="card card-body">
                                {products && products.filter(p => p.category === categories[index]).map(p => {

                            <Fragment>
                            <Product key={p._id} product={p}  col={12}/>
                                </Fragment>
                                })}
                                </div>
                                </div>

                                    </div>
                               
                                ))}
                                
                            </div>
                        </Fragment>
                        

                    )}
                            
                </div>
            </div>
        </Fragment>
    )
}

export default POS
