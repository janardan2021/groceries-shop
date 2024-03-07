import { useParams} from "react-router-dom"
import {useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Form} from 'react-bootstrap'
// import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice";

import Loader from "../components/Loader";
import {toast} from 'react-toastify'
import Message from "../components/Message";

import {useProductById} from '../hooks/productsHooks.js'
import { useCartContext } from "../hooks/useCartContext.js";
// import Meta from "../components/Meta";
// import { addToCart } from "../slices/cartSlice";

const ProductPage = () => {
   const {id} = useParams();

//    const dispatch = useDispatch()
   // const navigate = useNavigate()

   const [qty, setQty] =useState(1)

//    const [rating, setRating] = useState(0)
//    const [comment, setComment] = useState('')

//    const {data: product, isLoading, isError, refetch} = useGetProductDetailsQuery(productId)
   const {data: product, isLoading, isError} = useProductById(id)
   const {dispatch} = useCartContext()
   // if(product) {console.log(product)}

//    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation()

//    const {userInfo} = useSelector((state) => state.auth)
// console.log('cart', cart)
   const addToCartHandler = () => {
   //  console.log('Added to the cart', {...product.data, qty} )
   
    dispatch({type:'ADDTOCART', payload: {...product.data, qty}})
    toast.success('🥕 Item added to the cart', {
      position: "top-center",
      autoClose: 1000
      });
      // navigate('/cart')
  }
 
  
  return (
    <div>
      <Link className="btn mybtn my-3" style={{color:'white'}} to='/'>Go back</Link>
      
      {isLoading ? (
         <div>
            <Loader />
         </div>
      ) : isError ? (
         <Message variant={'danger'}>{isError?.data?.message || isError.error}</Message>
      ) : (
       <div>
         {/* <Meta title={product.name}/> */}
         <Row md={10} className="justify-content-around" >
          <Col md={5} >
          <div className="flex justify-center">
          <Image src={product.data.image} alt={product.data.name} 
           className="object-cover h-[400px] w-[400px] rounded-md shadow-md shadow-green-300 mb-4" />
          </div>
          </Col>
          <Col md={5} >
             <Card className="p-3 shadow-md shadow-green-300">
             <ListGroup variant="flush">
                 <ListGroup.Item>
                     <h3>{product.data.name}</h3>
                 </ListGroup.Item>
                 {/* <ListGroup.Item>
                     <Rating value={product.data.rating} text={`${product.data.numReviews} reviews`}/>
                 </ListGroup.Item> */}
                 <ListGroup.Item>
                  <Row>
                  <div className="flex justify-between">
                            <p>price:</p>
                            <p className="text-green-700 font-semibold">${product.data.price} per lb</p>
                        </div>
                  </Row>
                 </ListGroup.Item>
                 <ListGroup.Item>
                     <span className="text-sky-700 font-semibold">Description:</span> {product.data.description}
                 </ListGroup.Item>
                <ListGroup.Item>
                   <Row>
                   <div className="flex justify-between">
                            <p>Status:</p>
                            <p className="text-green-700 font-semibold">
                            {product.data.countInStock > 0 ? 
                            <span className="text-green-700 font-semibold">In stock</span>: 
                            <span className="text-gray-400 font-semibold">Out of stock</span>}
                            </p>
                        </div>
                        
                   </Row>
                </ListGroup.Item>

                {product.data.countInStock > 0 && (
                  <ListGroup.Item>
                    
                     <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                           {[...Array(product.data.countInStock).keys()].map((x) => 
                              <option key={x+1} value={x+1}>
                                 {x+1}
                                 </option>)}
                          </Form.Control>
                        </Col>
                     </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                    <button 
                      className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                      py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                      ease-in-out active:bg-green-800 hover:scale-105"
                      type="button" 
                      disabled={product.data.countInStock === 0}
                      onClick={addToCartHandler}>
                       Add to Cart
                    </button>
                </ListGroup.Item>
             </ListGroup>
             </Card>
          </Col>
          
         </Row>
       </div>  
      )}
     
    </div>
  )
}

export default ProductPage
