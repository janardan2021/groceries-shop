import { LinkContainer } from "react-router-bootstrap"
import { Table} from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import Message from '../../components/Message'
import Loader from '../../components/Loader'
// import { useGetOrdersQuery } from "../../slices/ordersApiSlice"
import {useGetAllOrders} from '../../hooks/ordersHooks'

const OrderListPage = () => {
//   const {data: orders, isLoading, error } = useGetOrdersQuery()
const {data: orders, isLoading, isError, error} = useGetAllOrders()
if (isError) console.log(isError)
  return (
    <div className='shadow-md shadow-green-300 py-2 px-4'>
     <h2>Orders</h2>
     {isLoading ? <Loader /> : isError ? <Message variant='danger'>{error.message}</Message>  : (
      <Table striped hover responsive className="table-sm">
        <thead>
         <tr>
          <th><span className='text-green-700'>ORDER ID</span></th>
          <th><span className='text-green-700'>USER</span></th>
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
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  <span className="text-green-700">{order.paidAt.substring(0,10)}</span>
                ) : (<FaTimes style={{color: 'red'}}/>)}
              </td>
              <td>
              {order.isDelivered ? (
                  <span className="text-green-700">{order.deliveredAt.substring(0,10)}</span>
                ) : (<FaTimes style={{color: 'red'}}/>)}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <button 
                  className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                  py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                  ease-in-out active:bg-green-800 hover:scale-105">
                    Details
                  </button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     )}
    </div>
  )
}

export default OrderListPage
