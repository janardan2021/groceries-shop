import { Link, useNavigate} from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../slices/cartSlice";
import { useCartContext } from "../hooks/useCartContext.js"

const ShoppingCartPage = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const cart = useSelector((state) => state.cart)
    // const {cartItems} = cart;
    const {state: cart, dispatch} = useCartContext()

    const addToCartHandler = async (cartItem, qty) => {
        dispatch({type:'ADDTOCART', payload: {...cartItem, qty}})
    }
    const removeFromCartHandler = async (id) => {
        dispatch({type:'REMOVEFROMCART', payload: id})
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }
// console.log('cart', cart)
  return (
    <Row className="justify-content-around">
       
        <Col lg={7} >
           <Card className="shadow-md shadow-green-300 p-2 mb-4">
          <Card.Body >
           <Card.Title ><b>Your Cart list</b></Card.Title>
           {cart.cartItems.length === 0 ? (
                <p >
                    Your cart is empty <Link className="text-green-700" to='/'>Go back</Link>
                </p>
            ) : (
                <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                        <Row className="align-items-center" >
                            <Col xs={2}>
                              <Link to={`/product/${item._id}`}>
                                <Image src={item.image} alt={item.name} 
                                className="object-cover h-[50px] w-[50px] rounded-lg"/>
                              </Link>  
                            </Col>
                            <Col xs={3}>
                                <Link to={`/product/${item._id}`} style={{textDecoration:'none'}}
                                className="font-semibold text-green-700"> {item.name}</Link>
                            </Col>
                            <Col xs={2}>${item.price} / lb</Col>
                            <Col xs={2}>
                               <Form.Control 
                                  as='select' 
                                  value={item.qty} 
                                  onChange={(e) => {addToCartHandler(item, Number(e.target.value))}}>
                                     {[...Array(item.countInStock).keys()].map((x) => 
                                            <option key={x+1} value={x+1}>
                                                     {x+1}
                                             </option>)}
                               </Form.Control>
                            </Col>
                            <Col xs={2}>
                                <button className="bg-green-100 p-2 rounded-md"
                                   type="button" 
                                   variant="light"
                                   onClick={() => removeFromCartHandler(item._id)}>
                                     <FaTrash style={{color: 'red'}}/>
                                 </button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            )}
           </Card.Body>
           </Card>
        </Col>
        <Col lg={3} >
        
            <Card className="shadow-md shadow-green-300 p-2 mb-4" >
                <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className="flex justify-between">
                            <p>Total items:</p>
                            <p className="text-green-700 font-semibold">{cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="mb-5">
                    <div className="flex justify-between">
                            <p>Price (before tax)</p>
                            <p className="text-green-700 font-semibold">${cart.cartItems
                              .reduce((acc, item) => acc + item.qty * item.price, 0)
                              .toFixed(2)}</p>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="mt-5">
                        <button className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                      py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                      ease-in-out active:bg-green-800 hover:scale-105"
                           type="button" 
                           disabled={cart.cartItems.length === 0}
                           onClick={checkoutHandler}>
                            Proceed to checkout
                        </button>
                    </ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card>
        
        </Col>
    </Row>
  )
}

export default ShoppingCartPage
