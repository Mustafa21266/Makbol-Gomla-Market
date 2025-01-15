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

const GettingStarted = ( { match } ) => {
  const dispatch = useDispatch();
  const alert = useAlert()
  // const { loading, error, } = useSelector(state => state.products)
  // let keyword = window.location.href.includes("/search/all") ? match.params.keyword : 'home'
  // dispatch(getProducts(keyword,currentPage,price,category, subcategory, rating));
  useEffect(() => {

    
    return () => {
            // Anything in here is fired on component unmount.
          window.location.reload();
        }
  }, [])
  const switchView = () => {
    // dispatch({
    //   type: ALL_PRODUCTS_REQUEST,
    //   payload: []
    // })
    // dispatch(loadUser());
    // setTimeout(function(){ window.location.reload(); }, 2000);
    
    if(error){
      return alert.error(error)
    }
  }
    return (
        <Fragment>
          { loading ? <Loader /> : (
            <Fragment>
            <MetaData title={`مقبول جملة ماركت - Makboul Gomla Market`}/>
              <div>
                <br />
                <br />
    <div className="row">
    <div className="col-12 col-md-4 d-flex justify-content-center" style={{padding: '50px'}}>
      <Link to={'/home'} className='getting-started-btn' onClick={()=> switchView()}>الرئيسية</Link>
    </div>
    <div className="col-12 col-md-4 d-flex justify-content-center" style={{padding: '50px'}}>
      <Link to={'/search/gomla'} className='getting-started-btn' onClick={()=> switchView()}>الجملة</Link>
    </div>
    <div className="col-12 col-md-4 d-flex justify-content-center" style={{padding: '50px'}}>
      <Link to={'/search/piece'} className='getting-started-btn' onClick={()=> switchView()}>القطاعي</Link>
    </div>
</div>
              </div>
        
</Fragment>
          )}
            
        </Fragment>
    )
}

export { refr } ;

export default GettingStarted
