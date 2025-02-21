import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { getAdminProducts, deleteProduct, clearErrors} from '../../actions/productActions'

import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
const ProductsList = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector(state => state.auth)
    const { loading , error } = useSelector(state => state.products)
    let { products } = useSelector(state => state.products)
    const [searchTerm, setSearchTerm] = useState(' ');
    const [category, setCategory] = useState('ChipsAndSnacks');
    const [subcategory, setSubCategory] = useState('Piece');
    const [price, setPrice] = useState(0);
    let filteredKeywords = [];
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
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    // const [data, setData]= useState(setOrders())
    useEffect(()=>{
        dispatch(getAdminProducts())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(isDeleted){
            alert.success("! تم إلغاء المنتج")
            dispatch({ type: DELETE_PRODUCT_RESET})
            if(user.role === "admin"){
                history.push('/admin/products')
            }else {
                history.push('/seller/products')
            }
        }
    },[dispatch, alert, error, deleteError, isDeleted, category, searchTerm, filteredKeywords ])
    if(user.role === "seller"){
        products = products.filter(p => p.seller_id === user._id)
    }
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'الصنف',
                    field: 'subcategory',
                    sort: 'asc'
                },
                {
                    label: 'الإسم',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'الصورة',
                    field: 'picture',
                    sort: 'asc'
                },
                {
                    label: 'السعر',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'المخزون',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'خيارات',
                    field: 'actions'
                },
            ],
            rows: []
        }
        // .sort((a, b) => a.name.localeCompare(b.name))

        // .sort((a, b) => b.subcategory.localeCompare(a.subcategory))
        const regex = /[^\w\s']/g;
        let keywords = [];
        products
            .filter(p => p.subcategory === subcategory)
            .filter(p => p.category === category)
            .forEach(product => {
            if(product.name.includes(searchTerm)){
                keywords.push(product.name)
                data.rows = data.rows.concat ({
                    id: product._id,
                    subcategory: product.subcategory === "Gomla" ? "جملة" : "قطاعي",
                    name: product.name,
                    picture: <img src={product.images[0].url} style={{width: '100px',height:'100px'}} />,
                    price: `${product.price} EGP`,
                    stock: product.stock,
                    actions: 
                    <Fragment>
                        <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                        <Link to={user.role === "admin" ? `/admin/product/${product._id}` : `/seller/product/${product._id}`} className="btn btn-primary py-2 px-3"><i className="fa fa-pencil"></i></Link>
                        </div>
                        
                            
                        </div>
                        <hr />
                        <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-danger py-2 px-3" onClick={()=> deleteProductHandler(product._id)}>
                        <img src="https://res.cloudinary.com/dvlnovdyu/image/upload/v1736898894/circle-x_mggwcv.png" alt="Circle X Delete" style={{width: "40px", height: "40px"}}/>
                            </button>
                        </div>
                        </div>
                     
                    </Fragment>
                })
            }
           
        });
        // filteredKeywords = [...new Set(keywords)];
        filteredKeywords = keywords;
            return data
    }
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    return (
        <Fragment>
        <MetaData title={'All Products'} />
        <div className="row">
             <div className="col-12 col-md-2">
                 <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className='row'>
                        <div className='col-12'>
                        <div className="form-group">
                <label htmlFor="subcategory_field">التصنيف</label>
                <select className="form-control" id="subcategory_field"
                name="subcategory"
                value={subcategory}
                onChange={(e)=> setSubCategory(e.target.value)}
                required
                >
                     {['جملة', 'قطاعي'].map((category,index) => { 
                      if (category === "جملة"){
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
                      if(index === 1){
                        return <option key={category} value={category} selected>{categoriesx[categories.indexOf(category)]}</option>
                      }else {
                        return <option key={category} value={category}>{categoriesx[categories.indexOf(category)]}</option>
                      }
})}
                    
                    
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="searchTerm_field">المنتج</label>
                <input
                type="text"
                id="searchTerm_field"
                className="form-control"
                name="searchTerm"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
              />
                <select className="form-control" id="searchTerm_field"
                name="searchTerm"
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                // onChange={(e)=> setName(e.target.value)}
                >
                    {filteredKeywords
                   .map((keyword,index) => {
                      if(index === 1){
                        return <option key={keyword} value={keyword} selected>{keyword}</option>
                      }else {
                        return <option key={keyword} value={keyword}>{keyword}</option>
                      }
})}
                    
                    
                  </select>
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
                        </div>
                    </div>
                    <h1 className="my-5 animate__animated animate__fadeIn" style={{padding:'15px', display: 'block',margin: 'auto'}}>كل المنتجات</h1>
                    <hr />
                    {loading ? <Loader /> : (
                        <MDBDataTable
                        data={setProducts()}
                        striped
                        bordered
                        small
                        disableRetreatAfterSorting={true}
                        noBottomColumns={true}
                        className="text-center mx-auto animate__animated animate__fadeIn  animate__delay-1s"
                        hover
                        responsive
                        />
        )}
                </Fragment>
                 
            </div>
        </div>
        
    </Fragment>
    )
}

export default ProductsList
