import React, { Fragment, useState ,useEffect, useRef } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import  Pagination  from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom'
import { loadUser, clearErrors } from '../actions/userActions'
// import { Carousel } from 'react-responsive-carousel';
let Carousel = require('react-responsive-carousel').Carousel;
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


let refr = null;

const GettingStarted = ( { history , match } ) => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const [subcategory, setSubCategory] = useState('');
  const [category, setCategory] = useState('');
  // const { loading, error, } = useSelector(state => state.products)
  // let keyword = window.location.href.includes("/search/all") ? match.params.keyword : 'home'
  // dispatch(getProducts(keyword,currentPage,price,category, subcategory, rating));
  useEffect(() => {
    if(category){
        history.push(`/search/${subcategory.toLowerCase()}/` + `${category.toLowerCase()}`)
        setTimeout(function(){ window.location.reload(); }, 500);
    }
    
    return () => {
        
            // Anything in here is fired on component unmount.
        //   window.location.reload();
        }
  }, [category])
  const switchView = (page) => {
    if(page === "home"){
        history.push("/home")
        setTimeout(function(){ window.location.reload(); }, 500);
    }

    // if(page === "run"){
        
        
    // }
    // dispatch({
    //   type: ALL_PRODUCTS_REQUEST,
    //   payload: []
    // })
    // dispatch(loadUser());
  }
    return (
            
            <Fragment>
            <MetaData title={`مقبول جملة ماركت - Makboul Gomla Market`}/>
            {!subcategory ? (
              <div>
                <br />
                <br />
    <div className="row">
    <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-2" style={{padding: '50px'}}>
      <Link className='getting-started-btn' onClick={()=> switchView("home")}>الرئيسية</Link>
    </div>
    <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-4" style={{padding: '50px'}}>
      <Link className='getting-started-btn' onClick={()=> 
      {
          setSubCategory("Gomla")
        //   switchView("categories")
      }
        }>الجملة</Link>
    </div>
    <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-6" style={{padding: '50px'}}>
      <Link className='getting-started-btn' onClick={()=> 
      {
          setSubCategory("Piece")
        //   switchView("categories")
      }
        }>القطاعي</Link>
    </div>
</div>
              </div>
            ) : (
                <div>
                  <br />
                  <br />
      <div className="row">
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-4" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Water")
            // switchView("run")
        }
          }>مياه</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-6" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Soft Drinks")
            // switchView("run")
        }
          }>مشروبات غازية</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-2" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Speciality Drinks")
            // switchView("run")
        }
          }>مشروبات مخصوصة</Link>
      </div>
  </div>
  <div className="row">
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-4" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Malt And Non-Alcholic")
            // switchView("run")
        }
          }>مشروبات الشعير وغير الكحوليات</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-6" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Sports And Energy Drinks")
            // switchView("run")
        }
          }>مشروبات رياضية ومشروبات طاقة</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-2" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Ice Cream")
            // switchView("run")
        }
          }>أيس كريم</Link>
      </div>
  </div>
  <div className="row">
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-4" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Chocolate")
            // switchView("run")
        }
          }>شوكلاتات</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-6" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Candy And Gums")
            // switchView("run")
        }
          }>حلويات ومستيكة</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-2" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Biscuits")
            // switchView("run")
        }
          }>بيسكويت</Link>
      </div>
  </div>
  <div className="row">
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-4" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Cakes")
            // switchView("run")
        }
          }>كيكات</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-6" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Coffee And Tea")
            // switchView("run")
        }
          }>قهوة وشاي</Link>
      </div>
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-2" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Chips And Snacks")
            // switchView("run")
        }
          }>شيبسيهات وسناكس</Link>
      </div>
  </div>
                </div>
              )
            }
        
</Fragment>
    )
}

export { refr } ;

export default GettingStarted
