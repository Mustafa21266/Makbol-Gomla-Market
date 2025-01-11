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
    const { loading , error, products } = useSelector(state => state.products)
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
            history.push('/admin/products')
        }
    },[dispatch, alert, error, deleteError, isDeleted])

    const setProducts = () => {
        const data = {
            columns: [
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
        products
            .sort((a, b) => a.name.localeCompare(b.name))
            .sort((a, b) => a.category.localeCompare(b.category))
            .forEach(product => {
            data.rows = data.rows.concat ({
                id: product._id,
                name: product.name,
                picture: <img src={product.images[0].url} style={{width: '100px',height:'100px'}} />,
                price: `${product.price} EGP`,
                stock: product.stock,
                actions: 
                <Fragment>
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-2 px-3"><i className="fa fa-pencil"></i></Link>
                    </div>
                    
                        
                    </div>
                    <hr />
                    <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-danger py-2 px-3" onClick={()=> deleteProductHandler(product._id)}>
                    <img src="./images/circle-x.png" alt="Circle X Delete" style={{width: "40px", height: "40px"}}/>
                        </button>
                    </div>
                    </div>
                 
                </Fragment>
                
                
            })
           
        });
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
