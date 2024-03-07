import {Link, useParams} from 'react-router-dom'
import { Row, Col, ListGroup, Image,Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {toast} from 'react-toastify'
// import { useGetOrderDetailsQuery,
//         useGetCheckoutUrlMutation,
//        useDeliverOrderMutation } from '../slices/ordersApiSlice'
// import { useSelector } from 'react-redux'
// import {useLocation} from 'react-router-dom'
import { useGetOrderDetails } from '../hooks/ordersHooks'
import {useUsersContext} from '../hooks/useUsersContext'
import { useGetCheckoutSessionUrl , useMarkDelivered} from "../hooks/ordersHooks.js"
import { useEffect } from 'react'

const OrderPage = () => {
    const {id: orderId} = useParams()
    // const location = useLocation()
    // const pathname = location.pathname
    const {data: orderDetails, isLoading: detailsLoading, isError: detailsError, refetch} = useGetOrderDetails(orderId)
    // const {data: order, refetch, isLoading, isError} = useGetOrderDetailsQuery(orderId)
    const {data: checkOutUrl, isLoading: loadingUrl,} = useGetCheckoutSessionUrl(orderId)
    const {state: user} = useUsersContext()
    // console.log(user)
    // const {userInfo} = useSelector((state) => state.auth)
    // const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation()
    const {mutate: deliverOrder, isError: deliverIsError,
         error:deliverError ,
        data: deliverData} = useMarkDelivered()

    useEffect(() => {
      if(deliverIsError) {
        toast.error(deliverError.message)
      } else if (deliverData?.data){
        toast.success('order delivered')
      }
    }, [deliverIsError, deliverData, deliverError ])
    
    const checkout = async (e) => {
        e.preventDefault()
       try {
            if(checkOutUrl) {
                    window.location.assign(checkOutUrl.data.url)
                    }
        } catch (error) {
            toast.error(error)
        }
    }

    const deliverOrderHandler = async () => {
            deliverOrder(orderId)
            refetch()
            
    }

//    if (orderDetails) console.log(orderDetails)
  return detailsLoading ? <Loader /> : detailsError ? <Message variant='danger' />
    : (
        <div>
         
         <Row className='justify-content-center'>
            <Col md={7}>
            <h3 className='text-green-700'>Order {orderDetails.data._id}</h3>
                <ListGroup variant='flush' className=' shadow-md shadow-green-300 mb-4'>
                   <ListGroup.Item>
                    <h3 className='font-semibold'>Shipping</h3>
                    <p>
                      <strong>Name: </strong>{orderDetails.data.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>{orderDetails.data.user.email}
                    </p>
                    <p>
                        <strong>Address: </strong>
                        {orderDetails.data.shippingAddress.address}, {orderDetails.data.shippingAddress.city}
                        {orderDetails.data.shippingAddress.postalCode}, {orderDetails.data.shippingAddress.country}
                    </p>
                    {orderDetails.data.isDelivered ? (
                        <Message variant='success'>Delivered on {orderDetails.data.deliveredAt}</Message>
                    ) : (
                        <Message variant="danger">Not delivered</Message>
                    )}
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <h3 className='font-semibold'>Payment</h3>
                     {orderDetails.data.isPaid === true ? (
                        <Message variant='success'>
                            <b>Paid on:</b> {orderDetails.data.paidAt.toString()}</Message>
                    ) : (
                        <Message variant="danger">Not paid</Message>
                    )}
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <h3>Order items</h3>
                     {orderDetails.data.orderItems.map((item, index) => (
                       <ListGroup.Item key={index}>
                        <Row>
                            <Col md={1}>
                                <Image src={item.image} alt={item.name} className='object-cover h-[45px] w-[45px] rounded-lg border'/>
                            </Col>
                            <Col >
                               <Link to={`/product/${item.product}`} style={{textDecoration: 'none'}}
                                className='text-green-700 font-semibold'>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                                {item.qty} x {item.price} = <span className='text-green-700'>${item.qty * item.price}</span>
                            </Col>
                        </Row>
                       </ListGroup.Item>
                     ))}
                   </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className='font-semibold'>Order summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className='flex justify-between'>
                                <p>Items price</p>
                                <p>${orderDetails.data.itemsPrice}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Shipping</p>
                                <p>${orderDetails.data.shippingPrice}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Tax</p>
                                <p>${orderDetails.data.taxPrice}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Total</p>
                                <p>${orderDetails.data.totalPrice}</p>
                            </div>
                        </ListGroup.Item>
                        {!orderDetails.data.isPaid ?  (
                            <ListGroup.Item>
                                {loadingUrl ? <Loader /> : 
                                <button onClick={(e) => checkout(e)}  
                                className='bg-green-600 text-white uppercase rounded  px-2 text-sm
                                py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                                ease-in-out active:bg-green-800 hover:scale-105'>
                                    Pay now
                                 </button>}
                            </ListGroup.Item>
                        ) : ( 
                            <ListGroup.Item>
                                <button disabled onClick={checkout}  
                                className='bg-gray-400 text-white uppercase rounded  px-2 text-sm
                                py-2 shadow-md '>
                                    Pay now
                                </button>
                            </ListGroup.Item>
                        )} 
                         {/* {loadingDeliver && <Loader />} */}
                        {user && user.isAdmin && orderDetails.data.isPaid && !orderDetails.data.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block mybtn' onClick={deliverOrderHandler}>
                                   Mark as delivered
                                </Button>
                            </ListGroup.Item>
                        )} 
                    </ListGroup>
                </Card>
            </Col>
         </Row>
        </div>
    )
}

export default OrderPage
