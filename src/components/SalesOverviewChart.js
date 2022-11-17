import {useState,useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Form from 'react-bootstrap/Form';
import apiClient from '../url/index';
import addYear from './addYear';
    const data = [
        {
          "month": "Jan",
          "sales": 0,
        },
        {
         "month": "Feb",
          "sales": 0,
        },
        {
         "month": "Mar",
          "sales": 0,
        },
        {
         "month": "Apr",
          "sales": 0,
        },
        {
          "month": "May", 
          "sales": 0,
        },
        {
          "month": "Jun", 
          "sales": 0,
        },
        {
          "month": "Jul",          
          "sales": 0,        
        },
        {
            "month": "Aug",          
            "sales": 0,        
          },
          {
            "month": "Sep",          
            "sales": 0,        
          },
          {
            "month": "Oct",          
            "sales": 0,        
          },
          {
            "month": "Nov",          
            "sales": 0,        
          },
          {
            "month": "Dec",          
            "sales": 0,        
          }
      ]

const SalesOverviewChart = () =>{
  const [salesOverviews,setSalesOverview] = useState(data)
  const years = addYear()
  const currentYear = new Date().getFullYear()*1
  const filterByYearHandler = async(e)=>{
    try{
      const response  = await apiClient.get(`admin/dashboard/bar?year=${e.target.value}`)
      if(response.status === 200){
        const datas = response.data.map(month=>{
          return {month:month.month.slice(0,3),sales:month.count}
        })
        let results =salesOverviews.map(element1=>datas.find(element2=>element1.month===element2.month) || element1)

        setSalesOverview(results)
      }
    }
    catch(err){}
  }
  useEffect(()=>{
    const fetchCurrentYearOrders = async() =>{
      
      try{
        const response  = await apiClient.get(`admin/dashboard/bar?year=${currentYear}`)
        if(response.status === 200){
          const datas = response.data.map(month=>{
            return {month:month.month.slice(0,3),sales:month.count}
          })
          let results =salesOverviews.map(element1=>datas.find(element2=>element1.month===element2.month) || element1)
  
          setSalesOverview(results)
        }
      }
      catch(err){}
    }
    fetchCurrentYearOrders()
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return (
      <>
      <div className='d-flex justify-content-between w-100'>
      <div className='fw-bold fs-5 p-3'>Sales Overview</div>
      <div>
      <Form.Select onChange={filterByYearHandler}>
      {
        years.map(year =>{
         return (<option value={year} key={year} selected={year ===currentYear}>Year {year}</option>)
        })
      }
 
</Form.Select>
      </div>
  </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={salesOverviews}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#FF7E00" />
        </LineChart>
      </ResponsiveContainer>
   
  </>
  );
}
export default SalesOverviewChart