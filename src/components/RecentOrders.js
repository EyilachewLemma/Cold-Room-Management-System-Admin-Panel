import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
import classes from './RecentOrders.module.css'
function RecentOrders() {
  return (
    <div>
        <div className='d-flex justify-content-between text-white px-4 pb-4'>
            <div className='fw-bold fs-5'>Recent Orders</div>
            <div>
           <Link to={''} className={`${classes.yellowText} text-decoration-none fw-bold fs-5`}>See All</Link>
            </div>
        </div>
      <Table responsive="md" borderless className='text-white'>
        <thead className={classes.header}>
          <tr>
            <th>Order ID</th>
            <th>Wholesaler</th>
            <th>Ordered Date(GC)</th>
            <th>Cold Room</th>
            <th>Price(ETB)</th>
            <th>Order Status</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RE123</td>
            <td>Kassahun Muluneh</td>
            <td>10-27-2022</td>
            <td>Bahir Dar</td>
            <td>12,678</td>
            <td>Pending</td>
            <td>Pending</td>
          </tr>
          <tr>
          <td>RE123</td>
            <td>Kassahun Muluneh</td>
            <td>10-27-2022</td>
            <td>Bahir Dar</td>
            <td>12,678</td>
            <td>Pending</td>
            <td>Pending</td>
          </tr>
          <tr>
          <td>RE123</td>
            <td>Kassahun Muluneh</td>
            <td>10-27-2022</td>
            <td>Bahir Dar</td>
            <td>12,678</td>
            <td>Pending</td>
            <td>Pending</td>
          </tr>
          <tr>
          <td>RE123</td>
            <td>Kassahun Muluneh</td>
            <td>10-27-2022</td>
            <td>Bahir Dar</td>
            <td>12,678</td>
            <td>Pending</td>
            <td>Pending</td>
          </tr>
          <tr>
          <td>RE123</td>
            <td>Kassahun Muluneh</td>
            <td>10-27-2022</td>
            <td>Bahir Dar</td>
            <td>12,678</td>
            <td>Pending</td>
            <td>Pending</td>
          </tr>
          <tr>
          <td>RE123</td>
            <td>Kassahun Muluneh</td>
            <td>10-27-2022</td>
            <td>Bahir Dar</td>
            <td>12,678</td>
            <td>Pending</td>
            <td>Pending</td>
          </tr>
          <tr>
          <td>RE123</td>
            <td>Kassahun Muluneh</td>
            <td>10-27-2022</td>
            <td>Bahir Dar</td>
            <td>12,678</td>
            <td>Pending</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </Table>

    </div>
  );
}

export default RecentOrders;