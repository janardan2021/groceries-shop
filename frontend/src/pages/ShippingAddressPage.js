import { useState } from "react"
import {Form, Row, Col} from 'react-bootstrap'

// import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { saveShippingAddress } from "../slices/cartSlice"
import { useCartContext } from "../hooks/useCartContext.js"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingAddressPage = () => {
    const {state: cart, dispatch} = useCartContext()
    // const cart = useSelector((state) => state.cart)
    // const {shippingAddress} = cart;

    const [address, setAddress] = useState(cart?.shippingAddress?.address || '')
    const [city, setCity] = useState(cart?.shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(cart?.shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(cart?.shippingAddress?.country || '')

    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch({type:'SAVESHIPPINGADDRESS', payload: {address, city, postalCode, country}})
        // dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/placeorder')
    }
  return (
   <div >
    <CheckoutSteps step1 step2 />
  <Row className="justify-content-center">
    <Col md={7}>
    <div className="p-4 shadow-md shadow-green-300">
   <h3 className="font-semibold">Shipping Address</h3>
    <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
        <Form.Label className="bold1">Address</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-3">
        <Form.Label className="bold1">City</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-3">
        <Form.Label className="bold1">PostalCode</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
        <Form.Label className="bold1">Country</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}>
        </Form.Control>
        </Form.Group>
        <button type="submit" 
            className="bg-green-600 text-white uppercase rounded  px-2 text-sm
            py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
            ease-in-out active:bg-green-800 hover:scale-105">
            Continue
        </button>
    </Form>
   </div>
    </Col>
  </Row>
   </div>
  )
}

export default ShippingAddressPage
