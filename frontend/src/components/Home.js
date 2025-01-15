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
// import { Carousel } from 'react-responsive-carousel';
let Carousel = require('react-responsive-carousel').Carousel;
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
import { loadUser, clearErrors } from '../actions/userActions'

let refr = null;

const Home = ( { match } ) => {
      let a = "";
let b = "";
if(window.location.href.includes("/search/gomla")){
      a = "Gomla"
      b = "Cakes"
      // currentUserPage = "/search/gomla"
      // keyword = ''
    }else if(window.location.href.includes("/search/piece")){
      a = "Piece"
      b = "Cakes"
      // currentUserPage = "/search/piece"
      // keyword = ''
    }

  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [subcategory, setSubCategory] = useState(a);
  const [category, setCategory] = useState(b);
  const [rating, setRating] = useState(0);
    
  // let currentUserPage = "/home";
  const myRef = useRef(null);
  const domainList = [
    "https://mokbel-gomla-market-08529c6a328e.herokuapp.com/",
    "https://makbol-gomla.store/",
    "http://localhost:3000/"
  ]
  const categoriesx = [
    'مياه',
                'مشروبات بارده',
                'مشروبات مخصوصة',
                'شعير خالى من الكحول',
                'مشروبات الطافة والرياضة',
                'آبس كريم',
                'شوكلاتة',
                'حلويات متنوعة',
                'بيسكويت',
                'كيكات',
                'شاى وقهوة',
                'شيبسيهات وسناكس'
  ]
  const categories = [
    'Water',
                'Soft Drinks',
                'Speciality Drinks',
                'Malt And Non-Alcholic',
                'Sports And Energy Drinks',
                'Ice Cream',
                'Chocolate',
                'Candy And Gums',
                'Biscuits',
                'Cakes',
                'Coffee And Tea',
                'Chips And Snacks'
  ]
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products)
  const alert = useAlert()
    
  // run this function from an event handler or an effect to execute scroll 
  // const keyword = match.params.keyword ? match.params.keyword : "all"
      
  let keyword = window.location.href.includes("/home") ? 'home' : (window.location.href.includes("/search/all") || window.location.href.includes("/search/gomla") || window.location.href.includes("/search/piece")) ? "searchAll" : match.params.keyword
  // dispatch(getProducts(keyword,currentPage,price,category, subcategory, rating));
  let count = productsCount;
  if(keyword){
    count = filteredProductsCount;
  }
  useEffect(() => {
    
    dispatch(getProducts(keyword,currentPage,price,category, subcategory, rating));
      if(localStorage.getItem("token")){
          // dispatch(loadUser())
          // dispatch(clearErrors())
    }
    if(error){
      return alert.error(error)
    }
    // , productsCount, resultsPerPage, filteredProductsCount, products
  }, [dispatch, alert ,error,keyword, currentPage,price, rating])
  function setCurrentPageNo(pageNumber){
    setcurrentPage(pageNumber)
  }
      refr = myRef;
    return (
        <Fragment>
          { loading ? <Loader /> : (
            <Fragment>
            <MetaData title={`مقبول جملة ماركت - Makboul Gomla Market`}/>
            {keyword === 'home' && (
              <div>
    <div className="row">
    <div className="col-12">                                
      <img className="img-fluid w-100 animate__animated animate__fadeIn  animate__delay-2.5s" src="./images/peter-bond-KfvknMhkmw0-unsplash.jpg" alt="homepage picture" style={{height: '350px', boxShadow: "5px 10px #888888"}}/>
      <div style={{position: 'absolute',bottom: '10px',left: '30px',width: '90%'}}>
      <div className="row">
      <div className="col-12 d-flex">
      <h1 className="animate__animated animate__headShake animate__infinite" style={{marginLeft: '10px',textAlign:'right',color:'white',display: 'block'}} >جودة عالية ، أفضل أسعار</h1>
      </div>
      <div className="col-12 d-flex justify-content-center">
      <Link id="view_btn" to={'/search/all'} className="btn" style={{fontSize: '2.48rem'}}>تسوق كل المنتجات</Link>
      </div>
      </div>

      </div>
      
    </div>
</div>
              </div>
            )}
        
            <h1 className="animate__animated animate__pulse animate__infinite" id="products_heading" style={{textAlign: 'center',color: 'white'}}>أخر المنتجات</h1>

<section id="products" className="container mt-5">
{/* <img className="img-fluid w-100 animate__animated animate__fadeIn  animate__delay-2.5s" src="./images/peter-bond-KfvknMhkmw0-unsplash.jpg" alt="homepage picture" style={{height: '350px', boxShadow: "5px 10px #888888"}}/> */}
  <div className="row">
    {keyword && keyword !== 'home' ? (
      <Fragment>
        <div className="col-12 col-md-4 mt-5 mb-5">
              <div className="px-5">
                <Range 
                marks={{
                  1 : `1EGP`,
                  1000: `1000EGP`
                }}
                min={1}
                max={1000}
                defaultValue={[1,1000]}
                tipFormatter={value => `${value}EGP`}
                tipProps={{
                  placement: "top",
                  visible: true
                }}
                value={price}
                onChange={price => setPrice(price)}
                />
                <hr className="my-5" />
                <div className="mt-5"> 
                <p>
  <a id="view_btn" className={`btn animate__animated animate__delay-${Math.floor(Math.random() * (6- 2+ 1) ) + 2}s animate__headShake `} style={{display: 'block'}} data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">الجملة</a>
  {/* <button className="btn animate__animated animate__delay-2s animate__headShake  " type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
  <button className="btn animate__animated animate__delay-2s animate__headShake  " type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button> */}
</p>
<div className="row">
  <div className="col-12">
    <div className="collapse multi-collapse" id="multiCollapseExample1">
    <ul className="pl-0" style={{textAlign: 'center',padding:'10px'}}>
                    {categoriesx.map(category => (
                    <li className="btn btn-link" style={{ cursor: 'pointer',listStyleType: 'none', color: 'blue'}}
                    key={category}
                    onClick={ () => {
                      setCategory(categories[categoriesx.indexOf(category)])
                      setSubCategory("Gomla")
                    } }
                    >{category}</li>
                    ))}
                  </ul>
      {/* <div className="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div> */}
    </div>
  </div>
  {/* <div className="col">
    <div className="collapse multi-collapse" id="multiCollapseExample2">
      <div className="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </div>
  </div> */}
</div>




















<div className="mt-5"> 
                <p>
  <a id="view_btn" className={`btn animate__animated animate__delay-${Math.floor(Math.random() * (6- 2+ 1) ) + 2}s animate__headShake `} style={{display: 'block'}} data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">القطاعي</a>
  {/* <button className="btn animate__animated animate__delay-3s animate__headShake  " type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
  <button className="btn animate__animated animate__delay-3s animate__headShake  " type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample2 multiCollapseExample2">Toggle both elements</button> */}
</p>
<div className="row">
  <div className="col-12">
    <div className="collapse multi-collapse" id="multiCollapseExample2">
    <ul className="pl-0" style={{textAlign: 'center',padding:'10px'}}>
                    {categoriesx.map(category => (
                    <li className="btn btn-link" style={{ cursor: 'pointer',listStyleType: 'none', color: 'blue'}}
                    key={category}
                    onClick={ () => {
                      setCategory(categories[categoriesx.indexOf(category)])
                      setSubCategory("Piece")
                    } }
                    >{category}</li>
                    ))}
                  </ul>
      {/* <div className="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div> */}
    </div>
  </div>
  {/* <div className="col">
    <div className="collapse multi-collapse" id="multiCollapseExample2">
      <div className="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </div>
  </div> */}
</div>
</div>







                  {/* <h4 style={{textAlign: 'center'}}>
                الجملة
                  </h4> */}
                  {/* <ul className="pl-0" style={{textAlign: 'center',padding:'10px'}}>
                    {categoriesx.map(category => (
                    <li style={{ cursor: 'pointer',listStyleType: 'none'}}
                    key={category}
                    onClick={ () => {
                      setCategory(categories[categoriesx.indexOf(category)])
                      setSubCategory("Gomla")
                    } }
                    >{category}</li>
                    ))}
                  </ul> */}
                </div>
                <div className="mt-5"> 
                  {/* <h4 style={{textAlign: 'center'}}>
                    قطاعي
                  </h4>
                  <ul className="pl-0" style={{textAlign: 'center',padding:'10px'}}>
                    {categoriesx.map(category => (
                    <li style={{ cursor: 'pointer',listStyleType: 'none'}}
                    key={category}
                    onClick={ () => {
                      setCategory(categories[categoriesx.indexOf(category)])
                      setSubCategory("Piece")
                    } }
                    >{category}</li>
                    ))}
                  </ul> */}
                </div>


                <hr className="my-3" />
                <div className="mt-5"> 
                  <h4 className="mb-3">
                    Ratings
                  </h4>
                  <ul className="pl-0"  style={{textAlign: 'center'}}>
                    {[5,4,3,2,1].map(star => (
                    <li style={{ cursor: 'pointer',listStyleType: 'none'}}
                    key={star}
                    onClick={ () => setRating(star) }
                    >
                      <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${star  * 20}%`}}>

                              </div>
                      </div>
                    </li>
                    ))}
                  </ul>
                </div>


              </div>
        </div>
        <div className="col-12 col-md-8 animate__animated animate__fadeIn">
        {resultsPerPage <= count && (
  <div className="d-flex justify-content-center mt-5">
<Pagination
          activePage={currentPage}
          itemsCountPerPage={resultsPerPage}
          totalItemsCount={count}
          onChange={setCurrentPageNo}
          nextPageText={'التالي'}
          prevPageText={'رجوع'}
          firstPageText={'الأولى'}
          lastPageText={'الأخير'}
          itemClass="page-item"
          linkClass="page-link"
        />
</div>
)}
        <div className="row">
        {products.map(product => (
        <Product  key={product._id} product={product}  col={4}/>
      ))}
        </div>
        {resultsPerPage <= count && (
  <div className="d-flex justify-content-center mt-5">
<Pagination
          activePage={currentPage}
          itemsCountPerPage={resultsPerPage}
          totalItemsCount={count}
          onChange={setCurrentPageNo}
          nextPageText={'التالي'}
          prevPageText={'رجوع'}
          firstPageText={'الأولى'}
          lastPageText={'الأخير'}
          itemClass="page-item"
          linkClass="page-link"
        />
</div>
)}
        </div>
        
      </Fragment>
    ) : (
      <Fragment>

<div className="col-12 animate__animated animate__backInUp">
  <div>
  {/* <h1 id="products_heading" style={{textAlign: 'right'}}>كيكات</h1> */}
  <section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
            {/* <Link to={'/search/all'} classNameName="btn" style={{fontSize: '48px'}}>تسوق كل المنتجات</Link> */}
                <h3 className="mb-3" style={{color: 'white'}}>كيكات </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn  mb-3 mr-1"  href="#carouselExampleIndicators2" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn  mb-3 "   href="#carouselExampleIndicators2" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                </a>
            </div>
            </div>
        <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                {products.filter(p => p.category === "Cakes").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Cakes").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Cakes").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  
           </div>
  {/* <h1 id="products_heading" style={{textAlign: 'right'}}>بيسكويت</h1> */}
  <section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>بيسكويت </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn  mb-3 mr-1"   href="#carouselExampleIndicators3" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn  mb-3 "   href="#carouselExampleIndicators3" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                </a>
            </div>
            </div>
      <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators3" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                {products.filter(p => p.category === "Biscuits").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Biscuits").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Biscuits").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  
  {/* <h1 id="products_heading" style={{textAlign: 'right'}}>بيسكويت</h1> */}
  <section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>شيبسيهات وسناكس </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                </a>
            </div>
            </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                            {products.filter(p => p.category === "Chips And Snacks").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Chips And Snacks").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Chips And Snacks").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>










<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>مياه </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                            {products.filter(p => p.category === "Water").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Water").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Water").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>مشروبات عازية </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                            {products.filter(p => p.category === "Soft Drinks").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Soft Drinks").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Soft Drinks").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>مشروبات مخصوصة </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                            {products.filter(p => p.category === "Speciality Drinks").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>

                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Speciality Drinks").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Speciality Drinks").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>مشروبات الشعير وغير الكحوليات </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                            {products.filter(p => p.category === "Malt And Non-Alcholic").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Malt And Non-Alcholic").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Malt And Non-Alcholic").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>مشروبات رياضية ومشروبات طاقة </h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
       
                            <div className="row">
                            {products.filter(p => p.category === "Sports And Energy Drinks").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                  
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Sports And Energy Drinks").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Sports And Energy Drinks").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>أيس كريم</h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
            
                            <div className="row">
                            {products.filter(p => p.category === "Ice Cream").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                     
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Ice Cream").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Ice Cream").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>شوكلاتات</h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                  
                            <div className="row">
                            {products.filter(p => p.category === "Chocolate").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                  
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Chocolate").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Chocolate").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>حلويات ومستيكة</h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                
                            <div className="row">
                            {products.filter(p => p.category === "Candy And Gums").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                   
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Candy And Gums").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Candy And Gums").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section className="pt-5 pb-5">
    <div className="container">
        <div className="row">
            <div className="col-6">
                <h3 className="mb-3" style={{color: 'white'}}>قهوة وشاي</h3>
            </div>
            <div className="col-6 text-right">
                <a id="view_btn" className="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i className="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" className="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i className="fa fa-arrow-right"></i>
                    </a>
            </div>
        </div>
    <div className="row">
            <div className="col-12">
                <div id="carouselExampleIndicators4" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                   
                            <div className="row">
                            {products.filter(p => p.category === "Coffee And Tea").slice(0, 3).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                 
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Coffee And Tea").slice(3, 6).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                            {products.filter(p => p.category === "Coffee And Tea").slice(6, 9).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div className="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div className="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  
{/* <Carousel autoPlay showArrows={true} width="100%" infiniteLoop={true} showThumbs={false}>
      
           <div>
  {products.slice(3, 6).map((product,index) => (
    <Fragment>
<Product key={product._id} product={product}  col={3}/>
    </Fragment>

          ))}
           </div>
           <div>
  {products.slice(6, 9).map((product,index) => (
    <Fragment>
<Product key={product._id} product={product}  col={3}/>
    </Fragment>

          ))}
           </div>
               </Carousel> */}

      <div className='row' ref={myRef}>
         <div className='col-12'>
         <img className="d-block mx-auto img-fluid" src="./images/vodafone.jpg" alt="Vodafone Cash" style={{borderRadius: '15px'}}/>
          </div>
      </div>
      <div className='row'>
         <div className='col-12'>
         <br />
          <br />
          <hr />
         <h3 style={{textAlign: 'center'}}>كيفية التحويل : </h3>
         <br />
         <br />
         <hr />
         <ul className="list-group d-block mx-auto" style={{borderRadius: '25px',padding: '20px'}}>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: 'black'}}> . حول علي رقم : 01027168516 . </li>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: 'black'}}> . خد سكرين شوت من عملية التحويل . </li>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: 'black'}}> . إرسل السكرين شوت إلى : </li>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: '#25d366'}}>
  <a className="btn btn-floating m-1 d-block mx-auto" style={{fontSize: '28px',color: '#25d366'}} href="https://wa.me/+2001127807379?text=السلام عليكم%20" target="_blank" role="button"><i className="fab fa-whatsapp" style={{color: '#25d366'}}></i></a>
  </li>
</ul>
          </div>
      </div>
      <br />
      <hr />
      <br />
      <div className='row'>
         <div className='col-12'>
         <img className="d-block mx-auto img-fluid" src="./images/orangecash.png" alt="Orange Cash" style={{borderRadius: '15px',backgroundColor: 'orange'}}/>
          </div>
      </div>
      <div className='row'>
         <div className='col-12'>
         <br />
          <br />
          <hr />
         <h3 style={{textAlign: 'center'}}>كيفية التحويل : </h3>
         <br />
         <br />
         <hr />
         <ul className="list-group d-block mx-auto" style={{borderRadius: '25px',padding: '20px'}}>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: 'black'}}> . حول علي رقم : 01224703104 . </li>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: 'black'}}> . خد سكرين شوت من عملية التحويل .</li>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: 'black'}}> . إرسل السكرين شوت إلى : </li>
  <li className="list-group-item list-group-item-primary" style={{textAlign: 'right',color: '#25d366'}}>
  <a className="btn btn-floating m-1 d-block mx-auto" style={{fontSize: '28px',color: '#25d366'}} href="https://wa.me/+2001127807379?text=السلام عليكم%20" target="_blank" role="button"><i className="fab fa-whatsapp" style={{color: '#25d366'}}></i></a>
  </li>
</ul>
          </div>
      </div>
</div>
  
          </Fragment>
    )}
    
    

  </div>
</section>



</Fragment>
          )}
            
        </Fragment>
    )
}

export { refr } ;

export default Home
