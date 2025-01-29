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
    const { loading , error } = useSelector(state => state.products)
    let { products } = useSelector(state => state.products)
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
    },[dispatch, alert, error,])
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
                                <div class="accordion" id="accordionExample">
                            {categories.map((category, index) => {

                                if(index === 0){
                                    return (
                                        <div class="accordion-item">
                                        <h2 class="accordion-header">
                                          <button className='btn btn-primary' style={{color: 'white'}} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${categories.indexOf(category)}`} aria-expanded="true" aria-controls={`#collapse${categories.indexOf(category)}`}>
                                          {categoriesx[categories.indexOf(category)]}
                                          </button>
                                        </h2>
                                        <div id={`#collapse${categories.indexOf(category)}`} class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                          <div class="accordion-body">
        {products.map(product => (
        <Product  key={product._id} product={product}  col={4}/>
      ))}
                                          </div>
                                        </div>
                                      </div>         
                                    )
                                }else {
                                    return (
                                        <div class="accordion-item">
                                        <h2 class="accordion-header">
                                          <button  className='btn btn-primary'  style={{color: 'white'}}  type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${categories.indexOf(category)}`} aria-expanded="true" aria-controls={`#collapse${categories.indexOf(category)}`}>
                                          {categoriesx[categories.indexOf(category)]}
                                          </button>
                                        </h2>
                                        <div id={`#collapse${categories.indexOf(category)}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                          <div class="accordion-body">

                                          {products.filter(p => p.category === categories[categories.indexOf(category)]).map(product => (
        <Product  key={product._id} product={product}  col={4}/>
      ))}
                                          </div>
                                        </div>
                                      </div>   
                                    )
                                }
                            }

                    )}

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
                                {/* <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">المنتجات<br /> <b>{products && user.role === "admin" ? 
                                            products.length : products.filter(p => p.seller_id === user._id).length
                                            }</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/seller/products">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">الأوردرات<br /> <b>{orders && user.role === "admin" ? orders.length : orders.filter(o => o.seller_id === user._id).length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                {user && user.role === "admin" && (
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">المستخدمين<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">عرض التفاصيل</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                )
                                }
                                


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <br />
                                            <div className="text-center card-font-size">منتج غير متوفر <br /> <b>{outOfStockProducts}</b></div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </Fragment>
                        

                    )}
                            
                </div>
            </div>
        </Fragment>
    )
}

export default POS
