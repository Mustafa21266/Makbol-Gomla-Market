import React, { Fragment, useEffect, useState, useRef } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { getAdminProducts, clearErrors} from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { allUsers } from '../../actions/userActions'
import SidebarPOS from './SidebarPOS'
import Product from '../product/Product'
import Cart from '../cart/Cart'
import { addItemToCart, removeFromCart, clearCart } from '../../actions/cartActions'
import "../../dbr";
import { BarcodeReader } from 'dynamsoft-javascript-barcode';
import ComponentBarcodeScanner from "./BarcodeScanner";

import HelloWorld from './HelloWorld';
// import 'dynamsoft-barcode-reader/dist/dbr.bundle.js';

// Dynamsoft.License.LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAzNjUzMzI0LVRYbFFjbTlxIiwibWFpblNlcnZlclVSTCI6Imh0dHBzOi8vbWRscy5keW5hbXNvZnRvbmxpbmUuY29tIiwib3JnYW5pemF0aW9uSUQiOiIxMDM2NTMzMjQiLCJzdGFuZGJ5U2VydmVyVVJMIjoiaHR0cHM6Ly9zZGxzLmR5bmFtc29mdG9ubGluZS5jb20iLCJjaGVja0NvZGUiOi05NDg0NDA5Mjd9");


const POS = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector(state => state.auth)
    const { loading , error } = useSelector(state => state.products)
    let { products } = useSelector(state => state.products)
    const [category, setCategory] = useState('Cakes');
    const categoriesx = [
        'مياه',
        'مشروبات بارده',
        'مشروبات مخصوصة',
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
    useEffect(async ()=>{
        dispatch(getAdminProducts())
        // (prepareScanner)();
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[dispatch, alert, error])
    setTimeout(() => {
        const resultsContainer = document.querySelector("#results");
        // EAN_13: 
        // alert(resultsContainer.textContent)
        products.forEach(p => {
            console.log(p.ean.includes(resultsContainer.textContent))
            console.log(p.ean, "    - -     ", resultsContainer.textContent)
            if( p.ean.includes(resultsContainer.textContent.trim())){
                dispatch(addItemToCart(p._id, 1))
                alert.success('تم إضافة المنتج في سلة التسوق')
            }else {
                // alert.error('try again')
            }
        // console.log(p.ean.includes(resultsContainer.textContent))
        });
    },10000)
    // const prepareScanner = async () => {
    //     let router = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();

    //     let view = await Dynamsoft.DCE.CameraView.createInstance();
    //     let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(view);
    //     document.querySelector("#cameraViewContainer").append(view.getUIElement());
    //     router.setInput(cameraEnhancer);
    
    //     const resultsContainer = document.querySelector("#results");
    //     router.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
    //       if (result.barcodeResultItems.length > 0) {
    //         resultsContainer.textContent = '';
    //         for (let item of result.barcodeResultItems) {
    //           resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
    //         }
    //       }
    //     }});
    
    //     let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
    //     filter.enableResultCrossVerification(
    //       Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
    //     );
    //     filter.enableResultDeduplication(
    //       Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
    //     );
    //     await router.addResultFilter(filter);
    
    //     await cameraEnhancer.open();
    //     await router.startCapturing("ReadSingleBarcode");
    // }
    return (
        <Fragment>
            {products && (
                <Fragment>
                    <HelloWorld />
                {/* <script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.0.21/dist/dbr.bundle.js"></script>
<div id="cameraViewContainer" style="width: 100%; height: 60vh;display: none;"></div>
<textarea id="results" style="width: 100%; min-height: 10vh; font-size: 3vmin; overflow: auto" disabled></textarea>
<script>
async () => {
        let router = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();

        let view = await Dynamsoft.DCE.CameraView.createInstance();
        let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(view);
        document.querySelector("#cameraViewContainer").append(view.getUIElement());
        router.setInput(cameraEnhancer);
    
        const resultsContainer = document.querySelector("#results");
        router.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
          if (result.barcodeResultItems.length > 0) {
            resultsContainer.textContent = '';
            for (let item of result.barcodeResultItems) {
              resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
            }
          }
        }});
    
        let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification(
          Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
        );
        filter.enableResultDeduplication(
          Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
        );
        await router.addResultFilter(filter);
    
        await cameraEnhancer.open();
        await router.startCapturing("ReadSingleBarcode");
    }
</script> */}
<div className="row">
                    <div className="col-12 col-md-5">
                        <Cart />
                        <button type="button" className="btn update-btn btn-block mt-4 mb-3" disabled={ loading ? true: false}>سكان</button>
                    </div>
                    <div className="col-12 col-md-7">
                        <br />
                    <h1 className="my-4 animate__animated animate__fadeIn" style={{padding:'15px', display: 'block',margin: 'auto'}}>نقطة البيع</h1>
                    <hr />
                    <br />
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'نقطة البيع'} />
                            <div className="row  animate__animated animate__fadeIn animate__delay-2s" style={{padding: '0px 50px'}}>
                            {categories.map((category, index) => (
                                    <div onClick={() => {
                                        setCategory(category)
                                        // document.getElementById("collapseExample").classList.toggle("show")
                                     }} >
 <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                {categoriesx[categories.indexOf(category)]}
                                </button>
                                    </div>
                                ))}
                                <div class="collapse show" id="collapseExample">
                                    <div className='row'>
                                {products && products.map(p => {
                                    if(p.category === category){
                                        return (
                                            <div className='col-12 col-md-3'>
                                                <Fragment>
                                                    <Product key={p._id} product={p}  col={12}/>
                                                </Fragment>
                                            </div>
                                        )
                                    }

                                }
                                
                                )}
                                    </div>
                                </div>
                                
                            </div>
                        </Fragment>
                    )}       
                </div>
            </div>
                </Fragment>
            
            )}
        </Fragment>
    )
}

export default POS
