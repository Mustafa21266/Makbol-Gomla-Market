import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const Sidebar = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <Fragment>
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to={user.role === "admin" ? "/dashboard" : "/seller/dashboard"}><i className="fa fa-tachometer"></i> لوحه التحكم</Link>
                    </li>
                    {user && user.role === "admin" && (
                    <li>
                        <a href="#accountingSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-dollar-sign"></i>حسابات</a>
                        <ul className="collapse list-unstyled" id="accountingSubmenu">
                            <li>
                            <Link to="/admin/accountings"><i className="fa fa-clipboard"></i> الكل</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/accounting"><i className="fa fa-plus"></i> حساب جديد</Link>
                            </li>
                        </ul>
                    </li>
                    )}
            {user && user.role === "admin" && (
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> منتجات</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link to="/admin/products"><i className="fa fa-clipboard"></i> الكل</Link>
                            </li>
            
                            <li>
                            <Link to="/admin/product"><i className="fa fa-plus"></i> منتج جديد</Link>
                            </li>
                        </ul>
                    </li>
            )}
            {user && user.role === "seller" && (
                <li>
                <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                    className="fa fa-product-hunt"></i> منتجات</a>
                <ul className="collapse list-unstyled" id="productSubmenu">
                    <li>
                    <Link to="/seller/products"><i className="fa fa-clipboard"></i> الكل</Link>
                    </li>
    
                    <li>
                    <Link to="/seller/product"><i className="fa fa-plus"></i> منتج جديد</Link>
                    </li>
                </ul>
            </li>
            )}
{user && user.role === "admin" && (

                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> أوردرات</Link>
                    </li>
)}
{user && user.role === "seller" && (

<li>
    <Link to="/seller/orders"><i className="fa fa-shopping-basket"></i> أوردرات</Link>
</li>
)}


                    {user && user.role === "admin" && (

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> المستخدمين</Link>
                    </li>
                    )}
{user && user.role === "admin" && (

<li>
<Link to="/admin/reviews"><i className="fa fa-star"></i> التقييمات</Link>
</li>
)}
{user && user.role === "seller" && (

<li>
<Link to="/seller/reviews"><i className="fa fa-star"></i> التقييمات</Link>
</li>
)}

                   
            
                </ul>
                </nav>
    </div>
        </Fragment>
    )
}

export default Sidebar
