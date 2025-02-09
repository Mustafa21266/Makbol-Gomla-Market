import React, { Fragment, useState ,useEffect, useRef } from 'react'
import MetaData from './layout/MetaData'
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom'

let refr = null;

const GettingStarted = ( { history , match } ) => {
  const [subcategory, setSubCategory] = useState('');
  const [category, setCategory] = useState('');
  useEffect(() => {
    if(category){
        history.push(`/search/${subcategory.toLowerCase()}/` + `${category.toLowerCase()}`)
        setTimeout(function(){ window.location.reload(); }, 50);
    }
  }, [category])
  const switchView = (page) => {
    if(page === "home"){
        history.push("/home")
        setTimeout(function(){ window.location.reload(); }, 15);
    }
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
  </div>
  <div className="row">
      <div className="col-12 col-md-4 d-flex justify-content-center animate__animated animate__zoomIn animate__delay-4" style={{padding: '50px'}}>
        <Link className='getting-started-btn' onClick={()=> 
        {
            setCategory("Molto")
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
            setCategory("Nescafe")
            // switchView("run")
        }
          }>نيسكافيه</Link>
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
