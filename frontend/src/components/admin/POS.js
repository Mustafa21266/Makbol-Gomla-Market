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
    const { user } = useSelector(state => state.auth)
    const { loading , error } = useSelector(state => state.products)
    let { products } = useSelector(state => state.products)
    const [category, setCategory] = useState('Water');
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
    useEffect(()=>{
        dispatch(getAdminProducts())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error, category])
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
                                    <div onClick={() => {
                                        setCategory(category)
                                        document.getElementById("collapseExample").classList.toggle("show")
                                     }} >
 <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                {categoriesx[categories.indexOf(category)]}
                                </button>
                                    </div>
                                ))}
                                <div class="collapse show" id="collapseExample">
                                <div class="card card-body">
                                {products.filter(p => p.category === category).forEach(p => (
                                        <Fragment>
                                            <Product key={p._id} product={p}  col={12}/>
                                        </Fragment>
                                )
                                )}
                                </div>
                                </div>
                                
                            </div>
                        </Fragment>
                        

                    )}
                            
                </div>
            </div>
        </Fragment>
    )
}

export default POS
