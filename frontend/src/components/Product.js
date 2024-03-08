import {Card, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

import { useCartContext } from "../hooks/useCartContext.js";


const Product = ({product}) => {
    const {dispatch} = useCartContext()
    const addToCartHandler = () => {
        //  console.log('Added to the cart', {...product.data, qty} )
        
         dispatch({type:'ADDTOCART', payload: {...product, qty: 1}})
         toast.success('🥕 Item added to the cart', {
           position: "top-center",
           autoClose: 1000
           });
           // navigate('/cart')
       }
    // console.log('product', product)
  return (
    <Card className='rounded-md shadow-md hover:shadow-lg shadow-gray-200 bg-green-400 
                      w-full sm:w-[280px] overflow-hidden my-2'>
        <Link to={`/product/${product._id}`} >
           <Card.Img src={`${product.image}`} variant='top' 
           className='h-[150px] hover:scale-x-105 transition ease-in-out '/>
        </Link> 
        <Card.Body className='bg-green-100'>
            <Link to={`/product/${product._id}`} style={{textDecoration: 'none'}} 
                 className='text-md font-medium text-black '>
                <Card.Title >
                    {product.name}
                </Card.Title>
            </Link>
           <Row>
            <Col>
            <Card.Text>
                {product.countInStock > 0 ? 
                <span className='text-md font-medium'>In stock: <span className='text-green-700 font-bold'>{product.countInStock} lb</span></span>
                 : 
                <span className='text-md font-medium text-gray-400'> Out of stock</span>}
            </Card.Text> 
            <Card.Text >
                <span className='text-green-500 font-semibold'>${product.price}</span> per lb
            </Card.Text>
            <button 
                      className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                      py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                      ease-in-out active:bg-green-800 hover:scale-105"
                      type="button" 
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}>
                       Add to Cart
                    </button>
            </Col>
           </Row>
        </Card.Body>
    </Card>
  )
}

export default Product
