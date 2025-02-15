import React, { Fragment, useEffect, useState, useRef } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { getAdminProducts, clearErrors} from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { allUsers } from '../../actions/userActions'
import SidebarPOS from './SidebarPOS'
import Product from '../product/Product'
import Cart from '../cart/Cart'
import { addItemToCart, removeFromCart, clearCart } from '../../actions/cartActions'


const POS = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector(state => state.auth)
    const { loading , error } = useSelector(state => state.products)
    let { products } = useSelector(state => state.products)
    const [category, setCategory] = useState('Cakes');
    const categoriesx = [
        'مياه',
        'مشروبات بارده',
        'مولتو',
        'آبس كريم',
        'شوكلاتة',
        'حلويات ومستيكة',
        'بيسكويت',
        'كيكات',
        'نيسكافيه',
        'شيبسيهات وسناكس'
    ]
    const categories = [
        'Water',
        'SoftDrinks',
        'Molto',
        'IceCream',
        'Chocolate',
        'CandyAndGums',
        'Biscuits',
        'Cakes',
        'Nescafe',
        'ChipsAndSnacks'
    ]
    useEffect(async ()=>{
        dispatch(getAdminProducts())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error])
    setInterval(() => {
        const resultsContainer = document.querySelector("#results");
        // EAN_13: 
        // alert(resultsContainer.textContent)
        products.forEach(p => {
            // console.log(p.ean.includes(resultsContainer.textContent))
            // console.log(p.ean, "    - -     ", resultsContainer.textContent)
            if(p.ean.trim().length > 1 && resultsContainer.textContent.trim().length > 1 &&  p.ean.includes(resultsContainer.textContent.trim())){
                dispatch(addItemToCart(p._id, 1))
                alert.success('تم إضافة المنتج في سلة التسوق')
            }else {
                // alert.error('try again')
            }
        // console.log(p.ean.includes(resultsContainer.textContent))
        });
    },5000)
    return (
        <Fragment>
            {products && (
                <Fragment>
<div className="row">
                    <div className="col-12 col-md-5">
                        <Cart />
                        <button type="button" className="btn update-btn btn-block mt-4 mb-3" disabled={ loading ? true: false}>سكان</button>
                    </div>
                    <div className="col-12 col-md-7">
                        <br />
                    <h1 className="my-4 animate__animated animate__fadeIn" style={{padding:'15px', display: 'block',margin: 'auto'}}>نقطة البيع</h1>
                    <hr />
                    <br />
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'نقطة البيع'} />
                            <div className="row  animate__animated animate__fadeIn animate__delay-2s" style={{padding: '0px 50px'}}>
                            {categories.map((category, index) => (
                                    <div onClick={() => {
                                        setCategory(category)
                                        // document.getElementById("collapseExample").classList.toggle("show")
                                     }} >
 <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                {categoriesx[categories.indexOf(category)]}
                                </button>
                                    </div>
                                ))}
                                <div class="collapse show" id="collapseExample">
                                    <div className='row'>
                                {products && products.map(p => {
                                    if(p.category === category){
                                        return (
                                            <div className='col-12 col-md-3'>
                                                <Fragment>
                                                    <Product key={p._id} product={p}  col={12}/>
                                                </Fragment>
                                            </div>
                                        )
                                    }

                                }
                                
                                )}
                                    </div>
                                </div>
                                
                            </div>
                        </Fragment>
                    )}       
                </div>
            </div>
                </Fragment>
            
            )}
        </Fragment>
    )
}

export default POS
