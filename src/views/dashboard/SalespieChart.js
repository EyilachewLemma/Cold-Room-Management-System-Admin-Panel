import {useState,useEffect} from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Form from 'react-bootstrap/Form';
import addYear from './addYear';
import apiClient from '../../url/index';
import classes from './SalespieChart.module.css'

const COLORS = ['#84DB3A','#FF7E00', '#FFFFFF',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

 const SalesPieChart = () => {
  const [bestSells,setBestSelles] = useState([])
  const currentYear = new Date().getFullYear()*1
  const [selectedValue,setSelectedValue] = useState(currentYear)
  const years = addYear() 
  
  useEffect(()=>{
    const fetchBestSells = async() =>{
      try{
        const response  = await apiClient.get(`admin/dashboard/pie?year=${currentYear}`)
        if(response.status === 200){
          const topSeller = response.data.sales.map(element=>{
            return {
              name:element.farmerProduct.product?.name,
              value:element.soldQuantity
            }
          }) 
          const bestSells = []
          topSeller.forEach((el,index)=>{
            bestSells[index] = topSeller[index]
          })
           if(topSeller.length > 2){
          const sum = (topSeller[0]?.value*1)+(topSeller[1]?.value*1)
          const otherValue = response.data.total*1-sum
          if(otherValue > 0){
          const other = {
            name:'Other',
            value:otherValue
          }
          bestSells[2]=other
        }    
          setBestSelles(bestSells)
        }
        else{
          setBestSelles(bestSells)
        }
      }
      }
      catch(err){}
    }
    fetchBestSells()
    setSelectedValue(preValue=>preValue)
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const filterByYearHandler = async(e)=>{
    setSelectedValue(e.target.value)
    try{
      const response  = await apiClient.get(`admin/dashboard/pie?year=${e.target.value}`)
      if(response.status === 200){
          console.log('piechart data=',response.data)
        const topSeller= response.data.sales.map(element=>{
          return {
            name:element.farmerProduct.product?.name,
            value:element.soldQuantity
          }
        }) || []
        const bestSells = []
        for(let i =0;i<topSeller.length;i++){
          bestSells.push(topSeller[i])
         }
         if(response.data.sales.length > 2){
        const topeSale1 = response.data.sales[0]?.soldQuantity
        const topeSale2 = response.data.sales[1]?.soldQuantity
        const sum = topeSale1 + topeSale2
        const otherValue = response.data.total-sum
        const other = {
          name:'Other',
          value:otherValue
        }
        bestSells.push(other)
        setBestSelles(bestSells)
      }
    }
  }
  
    catch(err){}
  }
    return (
      <div className='w-100 h-100 p-3'>
         <div className='d-flex justify-content-between'>
            <div className='fw-bold fs-5'>Sold Products</div>
            <div>
            <Form.Select onChange={filterByYearHandler} value={selectedValue}>
            {
              years.map(year =>{
               return (<option value={year} key={year}>Year {year}</option>)
              })
            }
      </Form.Select>
            </div>
        </div>
        <ResponsiveContainer width="100%" height="75%">
        <PieChart width={400} height={400}>
          <Pie
            data={bestSells}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {bestSells.length > 0?bestSells?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            )):""}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        <div className='d-flex'>
          <div className='d-flex align-items-center'>
            <div className={`${classes.greenBg} border`}></div>
            <span className='text-white ms-2'>{bestSells[0]?.name}</span>
          </div>
          <div className='d-flex align-items-center ms-2'>
            <div className={`${classes.yellowBg} border`}></div>
            <span className='text-white ms-2'>{bestSells[1]?.name}</span>
          </div>          
        </div>
       {
        bestSells.length > 2 &&(
          <div className='d-flex align-items-center my-1'>
          <div className={`${classes.whiteBg} border`}></div>
          <span className='text-white ms-2'>{bestSells[2]?.name}</span>
        </div>
        )
       }
        
      </div>
    );
            }
            export default  SalesPieChart
