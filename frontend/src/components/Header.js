import React from 'react'
// import {useNavigate} from 'react-router-dom'

import { Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap';

import {FaShoppingCart, FaUser} from 'react-icons/fa'
import  {LinkContainer} from 'react-router-bootstrap'

import { useUsersContext } from "../hooks/useUsersContext.js"
import { useCartContext } from "../hooks/useCartContext.js"
import { useLogoutUser } from '../hooks/usersHooks.js';

const Header = () => {
 const {state: user, dispatch} = useUsersContext()
 const {mutate: logout} = useLogoutUser()
 const {state: cart} = useCartContext()
  // console.log(user)
  const logoutHandler = async (e) => {
    try {
      logout()
      dispatch({type: 'LOGOUT'})
      localStorage.removeItem('user')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Navbar expand="lg" className='bg-green-700' > 
    <Container >

    <LinkContainer to='/' >
      <Navbar.Brand>
        <div className='navbarBrand text-2xl font-bold text-white'>Groceries-shop</div>
      </Navbar.Brand>
    </LinkContainer> 

      <Navbar.Text className="me-auto">
            <div className='navbarText text-white font-semibold mt-4 text-sm md:text-medium'>Fresh groceries from our farm</div>
      </Navbar.Text>

      <Navbar.Toggle className='bg-white text-black'/>

      <Navbar.Collapse className="justify-content-end">

       <div className='flex mt-3 lg:mt-0'>

       {user && user.isAdmin && (
              <NavDropdown title='Admin' className='text-white mr-4'>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}  

        <LinkContainer to='/cart' className='me-4'>
           <Nav.Link>
           <div className='flex items-center'>
                   {
                    cart.cartItems.length > 0 && (
                      <Badge pill  style={{transform:'translate(0ex, -2ex)'}} 
                             className='bg-white text-black'>
                        {cart.cartItems.reduce((a,c) => a + c.qty, 0)}
                      </Badge>
                    )
                   }
            <FaShoppingCart className='text-white mr-2'/> 
            <span className='text-white'>Cart</span>  
           </div>
           </Nav.Link>
         </LinkContainer>

      {user ? (
               <div className='flex items-center text-white'>
                <div className='mx-1 p-2 bg-white  rounded-full'>
                    <FaUser className='text-md  text-sky-600'/>
                </div>
                <NavDropdown  title={user.name} >
                  <div className='myshow'>
                      <LinkContainer to='/profile' >
                        <NavDropdown.Item >Profile</NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Item onClick={logoutHandler} >
                        Logout
                      </NavDropdown.Item>
                  </div>
               </NavDropdown>
               </div>
            ) : (
              <div className='flex text-white'>
                <LinkContainer to='/login' className='font-semibold mx-2 hover:scale-x-105 transition ease-in-out' >
                  <Nav.Link><span >Sign In</span></Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register' className='font-semibold mx-2 hover:scale-x-105 transition ease-in-out'>
                  <Nav.Link><span >Sign up</span></Nav.Link>
                </LinkContainer>
              </div>
            )}
          

       </div>

      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
