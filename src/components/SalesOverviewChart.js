import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
    const data = [
        {
          "month": "Jan",
          "sales": 4000,
        },
        {
         "month": "Feb",
          "sales": 3000,
        },
        {
         "month": "Mar",
          "sales": 2000,
        },
        {
         "month": "Apr",
          "sales": 2780,
        },
        {
          "month": "May", 
          "sales": 1890,
        },
        {
          "month": "Jun", 
          "sales": 2390,
        },
        {
          "month": "Jul",          
          "sales": 3490,        
        },
        {
            "month": "Aug",          
            "sales": 2700,        
          },
          {
            "month": "Sep",          
            "sales": 3200,        
          },
          {
            "month": "Oct",          
            "sales": 5000,        
          },
          {
            "month": "Nov",          
            "sales": 2100,        
          },
          {
            "month": "Dec",          
            "sales": 4200,        
          }
      ]

const SalesOverviewChart = () => {
    return (
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
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
    );
  
}
export default SalesOverviewChart