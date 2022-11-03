import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Form from 'react-bootstrap/Form';
import classes from './SalespieChart.module.css'

const data = [
  { name: 'Tomato', value: 400 },
  { name: 'Onion', value: 300 },
  { name: 'Other', value: 300 },
];

const COLORS = ['#84DB3A','#FF7E00', '#FFFFFF',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

 const SalesPieChart = () => {

    return (
      <div className='w-100 h-100 p-3'>
         <div className='d-flex justify-content-between'>
            <div className='fw-bold fs-5'>Sold Products</div>
            <div>
            <Form.Select>
        <option>Year 2010</option>
        <option>Year 2011</option>
        <option>Year 2012</option>
        <option>Year 2013</option>
        <option>Year 2014</option>
      </Form.Select>
            </div>
        </div>
        <ResponsiveContainer width="100%" height="80%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
        <div className='d-flex'>
          <div className='d-flex align-items-center'>
            <div className={`${classes.greenBg} border`}></div>
            <span className='text-white ms-2'>{data[0].name}</span>
          </div>
          <div className='d-flex align-items-center ms-2'>
            <div className={`${classes.yellowBg} border`}></div>
            <span className='text-white ms-2'>{data[1].name}</span>
          </div>
          <div className='d-flex align-items-center ms-2'>
            <div className={`${classes.whiteBg} border`}></div>
            <span className='text-white ms-2'>{data[2].name}</span>
          </div>
        </div>
      </div>
    );
            }
            export default  SalesPieChart
