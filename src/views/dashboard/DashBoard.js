import { Fragment,useEffect, useState } from 'react'
import SalesOverviewChart from '../../components/SalesOverviewChart'
import SalesPieChart from '../../components/SalespieChart';
import RecentOrders from '../../components/RecentOrders';
import { isLoadingAction } from "../../store/slices/spinerSlice";
import { useDispatch} from "react-redux";
import apiClient from "../../url/index";
import classes from './DashBoard.module.css'
const DashBoard = () =>{
    const [datas,setDatas] = useState({})
    const dispatch = useDispatch()
    const  featchOrders = async () =>{   
      
      dispatch(isLoadingAction.setIsLoading(true))
    try{
     var response = await apiClient.get(`admin/orders`)
     if(response.status === 200){
        setDatas(response.data)

     }
    }
    catch(err){}
    finally {dispatch(isLoadingAction.setIsLoading(false))}
  }
  useEffect(()=>{
    featchOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log('statistics data=',datas)
    return (<Fragment>
    <div className="d-flex justify-content-between">
        <div className={`${classes.blackBg} border shadow-sm px-3 pt-1 pb-2`}>
            <div className="d-flex justify-content-end p-0" >
                <span className={`${classes.greenTxt} ms-auto fs-5`}><i className="fa-solid fa-arrow-trend-up"></i></span>
                </div>
                <div className="d-flex">
                    <span className={`${classes.greenBg} rounded-circle fs-3 px-3 py-2 text-white`}>
                    <i className="fa-solid fa-layer-group"></i>
                    </span>
                    <div className=" ms-3 fw-bold text-white">
                        <div>Total Products</div>
                    </div>
                    <div className={`${classes.greenTxt} ms-3 fw-bold`}>10,1000 Kg</div>
                </div>
            
        </div>
        <div className={`${classes.blackBg} border shadow-sm px-3 pt-1 pb-2`}>
            <div className="d-flex justify-content-end p-0" >
                <span className={`${classes.yellowTxt} ms-auto fs-5`}><i className="fa-solid fa-arrow-trend-up"></i></span>
                </div>
                <div className="d-flex">
                    <span className={`${classes.yellowBg} rounded-circle fs-3 px-3 py-2 text-white`}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    </span>
                    <div className=" ms-3 fw-bold text-white">
                        <div>Total Orders</div>
                        <div className='small'>Last 30 days</div>
                    </div>
                    <div className={`${classes.yellowTxt} ms-3 fw-bold`}>1000</div>
                </div>
            
        </div>
        <div className={`${classes.blackBg} border shadow-sm px-3 pt-1 pb-2`}>
            <div className="d-flex justify-content-end p-0" >
                <span className={`${classes.greenTxt} ms-auto fs-5`}><i className="fa-solid fa-arrow-trend-up"></i></span>
                </div>
                <div className="d-flex">
                    <span className={`${classes.greenBg} rounded-circle fs-3 px-3 py-2 text-white`}>
                    <i className="fa-solid fa-arrow-trend-up"></i>
                    </span>
                    <div className=" ms-3 fw-bold text-white">
                        <div>Rent Revenue</div>
                        <div className='small'>Last 30 days</div>
                    </div>
                    <div className={`${classes.greenTxt} ms-3 fw-bold`}>21100 ETB</div>
                </div>
            
        </div>
        </div>
        <div className='d-flex mt-4'>
       <div className={`${classes.salesOverviewChart} p-3`}>
      
       <SalesOverviewChart />
       </div>
       <div className={`${classes.salesPieChart} ms-5`}>
        <SalesPieChart />
       </div>
       </div>
       <div className={`${classes.tableBg} mt-4 py-4`}>
       <RecentOrders />
       </div>
        </Fragment>
    )
    
}
export default DashBoard