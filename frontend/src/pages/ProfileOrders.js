import {Table} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import {useGetMyOrders} from '../hooks/ordersHooks.js'

const ProfileOrders = () => {
const {data: orders, isLoading: ordersLoading} = useGetMyOrders()
if(ordersLoading) return <h2>Loading....</h2>
if(orders) console.log(orders)
  return (
    <div className='shadow-md shadow-green-300 py-2 px-4'>
       <Table striped  hover responsive>
      <thead>
        <tr >
          <th><span className='text-green-700'>ORDER ID</span></th>
          <th><span className='text-green-700'>DATE</span></th>
          <th><span className='text-green-700'>TOTAL</span></th>
          <th><span className='text-green-700'>PAID</span></th>
          <th><span className='text-green-700'>DELIVERED</span></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       {orders.data.map((order) => (
        <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>{order.totalPrice}</td>
            <td>
                {order.isPaid ? (order.paidAt.substring(0,10) )
                : <FaTimes style={{color: 'red'}} />} 
            </td>
            <td>{order.isDelivered ? (order.deliveredAt.substring(0,10))
                       : <FaTimes style={{color:'red'}} />}
            </td>
            <td>
                <Link to={`/order/${order._id}`}>
                    <button className="bg-green-600 text-white uppercase rounded  px-2 text-sm
               py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
               ease-in-out active:bg-green-800 hover:scale-105" >Details
               </button>
                </Link>
            </td>
        </tr>
       ))}
      </tbody>
    </Table>
    </div>
  )
}

export default ProfileOrders
