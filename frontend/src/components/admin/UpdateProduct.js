import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { updateProduct, getProductDetails, clearErrors} from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import Sidebar from './Sidebar'

const UpdateProduct = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading , error: updateError, isUpdated } = useSelector(state => state.product)
    const { error } = useSelector(state => state.productDetails)
    const { products } = useSelector(state => state.products)
    let filteredProducts =  products.filter(product => product._id === match.params.id)
    const product = filteredProducts[0]
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const productId = match.params.id
    const categories = [
        'Electronics',
                    'Cameras',
                    'Laptop',
                    'Accessories',
                    'Food',
                    'Books',
                    'Clothes/Shoes',
                    'Sports',
                    'Home',
      ]
    useEffect(() => {
        if(product && product._id !== productId){
            // dispatch(getProductDetails(productId))
        }else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            setOldImages(product.images);
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated){
          history.push('/admin/products')
          alert.success('Product Updated Successully!')
          dispatch({ type: UPDATE_PRODUCT_RESET})
      }
        
    },[dispatch, error, alert, isUpdated, updateError, history, product, productId])

    function submitHandler(e){
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name)
        formData.set('price',price)
        formData.set('description',description)
        formData.set('seller',seller)
        formData.set('stock',stock)
        formData.set('category',category)
        formData.set('description',description)
        console.log(category)
        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateProduct(product._id,formData));
    }
    const onChange = e => {
            const files = Array.from(e.target.files)
            setImagesPreview([])
            setImages([])
            setOldImages([])

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
       <MetaData title={'Update Product'} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                <div className="wrapper my-5"> 
        <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-4">Update Product</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
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
                <label htmlFor="price_field">Price</label>
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
                <label htmlFor="description_field">Description</label>
                <textarea className="form-control" id="description_field" rows="8" 
                name="description"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select className="form-control" id="category_field"
                name="category"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                required
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                    
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={(e)=> setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  value={seller}
                  onChange={(e)=> setSeller(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            onChange={onChange}
                            multiple
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>
                    </div>
                    {oldImages && oldImages.map(img => (
                        <img className="mt-3 mr-2" src={img.url} key={img} alt="Old images" width="55" height="52"/>
                    ))}
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
              SAVE
            </button>
 
          </form>
    </div>
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default UpdateProduct
