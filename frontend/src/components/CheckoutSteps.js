import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"

const CheckoutSteps = ({step1, step2, step3}) => {
    const navigate=useNavigate()
    const location = useLocation()
    // console.log(location)
    function onClick() {
        navigate(`/login?redirect=${location.pathname}`)
    }
  return (
    <Nav className="justify-content-center">
        <Nav.Item>
            {step1 ? (
                // <LinkContainer to='/login?redirect=/shipping'>
                    <Nav.Link onClick={onClick} ><span className="font-semibold text-green-700">Sign In</span></Nav.Link>
                // </LinkContainer>
            ) : (
                <Nav.Link disabled><span className="font-semibold text-gray-400">Sign In</span></Nav.Link>
            ) }
        </Nav.Item>
        <Nav.Item>
            {step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link><span className="font-semibold text-green-700">Shipping</span></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><span className="font-semibold text-gray-400">Shipping</span></Nav.Link>
            ) }
        </Nav.Item>
        <Nav.Item>
            {step3 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link><span className="font-semibold text-green-700">Place order</span></Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled><span className="font-semibold text-gray-400">Place Order</span></Nav.Link>
            ) }
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
