import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { newProduct, clearErrors} from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import Sidebar from './Sidebar'
const NewProduct = ({ history }) => {
    const { user } = useSelector(state => state.auth)
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('Gomla');
    const [stock, setStock] = useState(0);
    // const [seller, setSeller] = useState('مقبول جملة ماركت');
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
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
      const alert = useAlert();
      const { loading , error, success } = useSelector(state => state.newProduct)
      // const [data, setData]= useState(setOrders())
      useEffect(()=>{
          if(error){
              alert.error(error)
              dispatch(clearErrors())
          }
          if(success){
            if(user.role === "admin"){
              history.push('/admin/products')
            }else {
              history.push('/seller/products')
            }
            alert.success('! تم إنشاءالمنتج بنجاح')
            dispatch({ type: NEW_PRODUCT_RESET})
        }
      },[dispatch, alert, error, success, history])

      function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name)
        formData.set('price',price)
        formData.set('description',description)
        if(user.role === "seller"){
          formData.set('seller',user.name)
          formData.set('seller_id',user._id)
        }else {
          formData.set('seller','مقبول جملة ماركت')
          formData.set('seller_id','6768297b32eaba11a883414d')
        }
        formData.set('stock',stock)
        formData.set('subcategory',subcategory)
        formData.set('category',category)
        formData.set('description',description)
        formData.set('token',localStorage.getItem('token'))
        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(newProduct(formData));
    }
    const onChange = e => {
            const files = Array.from(e.target.files)
            setImagesPreview([])
            setImages([])

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setImagesPreview(oldArray => [...oldArray,reader.result])
                        setImages(oldArray => [...oldArray,reader.result])
                    }
                }
                reader.readAsDataURL(file)
            })
            
        }
    return (
        <Fragment>
       <MetaData title={'منتج جديد'} />
        <div className="row animate__animated animate__fadeIn  animate__delay-1s">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                <div className="wrapper my-5"> 
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-4" style={{padding:'15px', display: 'block',margin: 'auto'}}>منتج جديد</h1>

            <div className="form-group">
              <label htmlFor="name_field">الإسم</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />
            </div>

            <div className="form-group">
                <label htmlFor="price_field">السعر</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={(e)=> setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">وصف المنتج</label>
                <textarea className="form-control" id="description_field" rows="8" 
                name="description"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="subcategory_field">التصنيف</label>
                <select className="form-control" id="subcategory_field"
                name="subcategory"
                value={subcategory}
                onChange={(e)=> setSubCategory(e.target.value)}
                required
                >
                     {['جملة', 'قطاعي'].map((category,index) => { 
                      if (category == "جملة"){
                        return (<option key={"Gomla"} value={"Gomla"} selected>{category}</option> )
                      }else {
                        return (<option key={"Piece"} value={"Piece"}>{category}</option> )
                      }
                      }   
                    )}
                    
                    
                  </select>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">التصنيف</label>
                <select className="form-control" id="category_field"
                name="category"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                required
                >
                    {categories.map((category,index) => {
                      if(index == 1){
                        return <option key={category} value={category} selected>{categoriesx[categories.indexOf(category)]}</option>
                      }else {
                        return <option key={category} value={category}>{categoriesx[categories.indexOf(category)]}</option>
                      }
})}
                    
                    
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">المخزون</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={(e)=> setStock(e.target.value)}
                />
              </div>

              {/* <div className="form-group">
                <label htmlFor="seller_field">إسم البائع</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  value={seller}
                  onChange={(e)=> setSeller(e.target.value)}
                />
              </div> */}
              
              <div className='form-group'>
                <label>صور المنتج</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            onChange={onChange}
                            multiple
                        />
                        <label className='custom-file-label' htmlFor='customFile' style={{textAlign: 'left'}}>
                            إختر الصور
                        </label>
                    </div>
                    {imagesPreview.map(img => (
                        <img className="mt-3 mr-2" src={img} key={img} alt="Images Preview" width="55" height="52"/>
                    ))}
            </div>

  
            <button
              id="login_button"
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

export default NewProduct
