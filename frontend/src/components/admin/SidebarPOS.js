import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SidebarPOS = () => {
    // const [subcategory, setSubCategory] = useState('');
    const [category, setCategory] = useState('');
    const categoriesx = [
        'مياه',
        'مشروبات بارده',
        'مولتو',
        'مشروبات الطافة والرياضة',
        'آبس كريم',
        'شوكلاتة',
        'حلويات متنوعة',
        'بيسكويت',
        'كيكات',
        'نيسكافيه',
        'شيبسيهات وسناكس'
      ]
      const categories = [
        'Water',
                    'Soft Drinks',
                    'Speciality Drinks',
                    'Molto',
                    'Sports And Energy Drinks',
                    'Ice Cream',
                    'Chocolate',
                    'Candy And Gums',
                    'Biscuits',
                    'Cakes',
                    'Nescafe',
                    'Chips And Snacks'
      ]
    const { user } = useSelector(state => state.auth)
    return (
        <Fragment>
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components" style={{textAlign:'right'}}>
                    <li>
                        <Link to={user.role === "admin" ? "/dashboard" : "/seller/dashboard"}><i className="fa fa-tachometer"></i> لوحه التحكم</Link>
                    </li>

                    {categories.map(category => (
                        <li>
                            <Link to={"#"}>{categoriesx[categories.indexOf(category)]}</Link>
                            
                        </li>
                    ))}

                    {/* <div className="form-group">
                <label htmlFor="category_field">التصنيف</label>
                <select className="form-control" id="category_field"
                name="category"
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                required
                >
                    
                    
                  </select>
              </div> */}
                    {/* {user && user.role === "admin" && (
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
)} */}

                   
            
                </ul>
                </nav>
    </div>
        </Fragment>
    )
}

export default SidebarPOS
