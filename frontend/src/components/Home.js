import React, { Fragment, useState ,useEffect } from 'react'
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
const Home = ( { match } ) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [subcategory, setSubCategory] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
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
                'ChipsAndSnacks'
  ]
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resultsPerPage, filteredProductsCount } = useSelector(state => state.products)
  const alert = useAlert()
  // const keyword = match.params.keyword ? match.params.keyword : "all"
  const keyword = match.params.keyword
  // dispatch(getProducts(keyword,currentPage,price,category, subcategory, rating));
  useEffect(() => {
    dispatch(getProducts(keyword,currentPage,price,category, subcategory, rating));
    if(error){
      return alert.error(error)
    }
  }, [dispatch, alert ,error,keyword, currentPage,price,category, subcategory, rating])
  function setCurrentPageNo(pageNumber){
    setcurrentPage(pageNumber)
  }
  let count = productsCount;
  if(keyword){
    count = filteredProductsCount;
  }
  console.log(products)
    return (
        <Fragment>
          { loading ? <Loader /> : (
            <Fragment>
            <MetaData title={`مقبول جملة ماركت - Makboul Gomla Market`}/>
            {!keyword && (
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
      <Link id="view_btn" to={'/search/all'} className="btn" style={{fontSize: '48px'}}>تسوق كل المنتجات</Link>
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
    {keyword ? (
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
<div class="row">
  <div class="col-12">
    <div class="collapse multi-collapse" id="multiCollapseExample1">
    <ul className="pl-0" style={{textAlign: 'center',padding:'10px'}}>
                    {categoriesx.map(category => (
                    <li class="btn btn-link" style={{ cursor: 'pointer',listStyleType: 'none', color: 'blue'}}
                    key={category}
                    onClick={ () => {
                      setCategory(categories[categoriesx.indexOf(category)])
                      setSubCategory("Gomla")
                    } }
                    >{category}</li>
                    ))}
                  </ul>
      {/* <div class="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div> */}
    </div>
  </div>
  {/* <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample2">
      <div class="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </div>
  </div> */}
</div>




















<div className="mt-5"> 
                <p>
  <a id="view_btn" className={`btn animate__animated animate__delay-${Math.floor(Math.random() * (6- 2+ 1) ) + 2}s animate__headShake `} style={{display: 'block'}} data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">القطاعي</a>
  {/* <button class="btn animate__animated animate__delay-3s animate__headShake  " type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
  <button class="btn animate__animated animate__delay-3s animate__headShake  " type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample2 multiCollapseExample2">Toggle both elements</button> */}
</p>
<div class="row">
  <div class="col-12">
    <div class="collapse multi-collapse" id="multiCollapseExample2">
    <ul className="pl-0" style={{textAlign: 'center',padding:'10px'}}>
                    {categoriesx.map(category => (
                    <li class="btn btn-link" style={{ cursor: 'pointer',listStyleType: 'none', color: 'blue'}}
                    key={category}
                    onClick={ () => {
                      setCategory(categories[categoriesx.indexOf(category)])
                      setSubCategory("Piece")
                    } }
                    >{category}</li>
                    ))}
                  </ul>
      {/* <div class="card card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </div> */}
    </div>
  </div>
  {/* <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample2">
      <div class="card card-body">
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
  <section class="pt-5 pb-5">
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h3 class="mb-3">كيكات </h3>
            </div>
            <div class="col-6 text-right">
                <a id="view_btn" class="btn  mb-3 mr-1"  href="#carouselExampleIndicators2" role="button" data-slide="prev">
                    <i class="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" class="btn  mb-3 "   href="#carouselExampleIndicators2" role="button" data-slide="next">
                    <i class="fa fa-arrow-right"></i>
                </a>
            </div>
            <div class="col-12">
                <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row">
                                {products.filter(p => p.category === "Cakes").slice(0, 4).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                            {products.filter(p => p.category === "Cakes").slice(4, 8).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                            {products.filter(p => p.category === "Cakes").slice(8, 12).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
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
           <div>
  {/* <h1 id="products_heading" style={{textAlign: 'right'}}>بيسكويت</h1> */}
  <section class="pt-5 pb-5">
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h3 class="mb-3">بيسكويت </h3>
            </div>
            <div class="col-6 text-right">
                <a id="view_btn" class="btn  mb-3 mr-1"   href="#carouselExampleIndicators3" role="button" data-slide="prev">
                    <i class="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" class="btn  mb-3 "   href="#carouselExampleIndicators3" role="button" data-slide="next">
                    <i class="fa fa-arrow-right"></i>
                </a>
            </div>
            <div class="col-12">
                <div id="carouselExampleIndicators3" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row">
                                {products.filter(p => p.category === "Biscuits").slice(0, 4).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                            {products.filter(p => p.category === "Biscuits").slice(4, 8).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                            {products.filter(p => p.category === "Biscuits").slice(8, 12).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
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
           <div>
  {/* <h1 id="products_heading" style={{textAlign: 'right'}}>بيسكويت</h1> */}
  <section class="pt-5 pb-5">
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h3 class="mb-3" style={{color: 'white'}}>شيبسيهات وسناكس </h3>
            </div>
            <div class="col-6 text-right">
                <a id="view_btn" class="btn mb-3 mr-1"    href="#carouselExampleIndicators4" role="button" data-slide="prev">
                    <i class="fa fa-arrow-left"></i>
                </a>
                <a id="view_btn" class="btn mb-3 "   href="#carouselExampleIndicators4" role="button" data-slide="next">
                    <i class="fa fa-arrow-right"></i>
                </a>
            </div>
            <div class="col-12">
                <div id="carouselExampleIndicators4" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <div class="row">
                            {products.filter(p => {
                              if(p.category === 'ChipsAndSnacks'){
                                return p
                              }else {
                                console.log(p.category)
                              }
                              
                            }).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div>
                        {/* <div class="carousel-item">
                            <div class="row">
                            {products.filter(p => p.category === "Chips And Snacks").slice(4, 8).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}

                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                            {products.filter(p => p.category === "Chips And Snacks").slice(8, 12).map((product,index) => {
                                    if(index === 0){
                                      return (
                                          <div class="col-md-4 mb-3">
                                      <Fragment>
                                <Product key={product._id} product={product}  col={12}/>
                                    </Fragment>
                                    </div>
                                      )
                                    }else {
                                      return (
                                          <div class="col-md-4 mb-3">
                                   <Fragment>
                                <Product key={product._id} product={product}  col={12}  style={{display: 'contents'}}/>
                                    </Fragment>
                                  </div>
                                      )
                                    }
                                          })}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  
           </div>
{/* <Carousel autoPlay showArrows={true} width="100%" infiniteLoop={true} showThumbs={false}>
      
           <div>
  {products.slice(4, 8).map((product,index) => (
    <Fragment>
<Product key={product._id} product={product}  col={3}/>
    </Fragment>

          ))}
           </div>
           <div>
  {products.slice(8, 12).map((product,index) => (
    <Fragment>
<Product key={product._id} product={product}  col={3}/>
    </Fragment>

          ))}
           </div>
               </Carousel> */}
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

export default Home
