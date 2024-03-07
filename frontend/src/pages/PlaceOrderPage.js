import { useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux"
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import {toast} from 'react-toastify'
import Message from '../components/Message'

// import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import { useCreateOrder } from "../hooks/ordersHooks.js"
import { useCartContext } from "../hooks/useCartContext.js"

const PlaceOrderPage = () => {
    const navigate = useNavigate()
    const {state: cart, dispatch} = useCartContext()
    const {mutate: createOrder, data: orderData} = useCreateOrder()

    useEffect(() => {
       if (!cart.shippingAddress.address) {
        navigate('/shipping')
       } 
       if (orderData?.data?.url) {
        
        // console.log(orderData)
        window.location.assign(orderData.data.url)
        dispatch({type:'CLEARCARTITEMS'})
        navigate('/', {replace:true})
       }
    }, [cart.shippingAddress.address, navigate, orderData, dispatch])

    const placeOrderHandler = async () => {
        //  console.log('ORDER placement started')
          try {
                createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                // paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
            // toast.error('order placed')
            
            
          } catch (err) {
            toast.error(err?.data?.message || err.error)
          } 
    }


  return (
    <div>
     <CheckoutSteps step1 step2 step3 step4/>
     <Row>
        <Col md={8}>
            <Card className="shadow-md shadow-green-300 p-4 mb-4">
                <Card.Body>
                <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2 className="font-bold">Shipping Address</h2>
                    <p className="text-green-700">
                        <span>{cart.shippingAddress.address}, </span>
                        <span>{cart.shippingAddress.city} </span>
                        <span>{cart.shippingAddress.postalCode}, </span> 
                        <span>{cart.shippingAddress.country}</span>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p className="text-lg font-bold">Items in the order</p>
                    {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                       <ListGroup variant="flush">
                         {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key= {index}>
                                <Row className="align-items-center">
                                    <Col >
                                        <Image src={item.image} alt={item.name}
                                        className="object-cover h-[50px] w-[50px] rounded-lg border border-gray-500"/>
                                    </Col>
                                    <Col>
                                      <Link to={`/products/${item.product}`} style={{textDecoration:'none'}}
                                         className="font-semibold text-green-700">
                                        {item.name}
                                      </Link>
                                    </Col>
                                    <Col >
                                        <span className="font-semibold">{item.qty} x ${item.price}</span>
                                         = <span className="font-semibold text-green-700">${item.qty * item.price}</span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                         ))}
                       </ListGroup> 
                    )}
                </ListGroup.Item>
            </ListGroup>
                </Card.Body>
            </Card>
        </Col>
        <Col md={4}>
            <Card className="p-3 shadow-md shadow-green-300">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                       <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <div className="flex justify-between">
                            <p>Items price:</p>
                            <p className="text-green-700 font-semibold">${cart.itemsPrice}</p>
                        </div>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <div className="flex justify-between">
                            <p>Shipping:</p>
                            <p className="text-green-700 font-semibold">${cart.shippingPrice}</p>
                        </div>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <div className="flex justify-between">
                            <p>Tax:</p>
                            <p className="text-green-700 font-semibold">${cart.taxPrice}</p>
                        </div>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    
                        <Row>
                        <div className="flex justify-between">
                            <p>Total:</p>
                            <p className="text-green-700 font-semibold">${cart.totalPrice}</p>
                        </div>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <button type="button"
                                className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                                py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                                ease-in-out active:bg-green-800 hover:scale-105"
                                disabled={cart.cartItems.length === 0}
                                onClick={placeOrderHandler}> 
                           Place order
                        </button>
                        {/* {isLoading && <Loader />} */}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            
        </Col>
     </Row>
    </div>
  )
}

export default PlaceOrderPage
