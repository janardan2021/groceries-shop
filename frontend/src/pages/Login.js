import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Card } from "react-bootstrap";
import { useUsersContext } from "../hooks/useUsersContext.js"
import { useLoginUser } from "../hooks/usersHooks.js";
// import Loader from "../components/Loader";
// import { useLoginMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
import Message from "../components/Message.js";

import React from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {state: user, dispatch: userDispatch} = useUsersContext()
    const {mutate: loginUser, data: userData, error} = useLoginUser()
   
    const navigate = useNavigate()

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect')
    
    if (userData?.data && !user) {
        userDispatch({type: 'LOGIN', payload: userData.data})
        localStorage.setItem('user' , JSON.stringify(userData.data))
    }

    // if (user) {
    //     console.log(user)
    //     console.log(user.name)
    // }

    useEffect(() => {
        if (redirect && user) {
            navigate(redirect)
         } else if (user) {
            navigate('/')
        } 
        
    }, [user,navigate, redirect])

    function validateSignIn(email, password) {
        if(password===null || password ==='' || password===undefined){
          toast.error('Please enter your password!')
          return false
        }
        if(email===null || email ==='' || email===undefined){
          toast.error('Please enter your email!')
          return false
        }
        const validateEmail = (email) => {
          return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
        };
    
        if(!validateEmail(email)) {
          toast.error('Please enter valid email!')
          return false
        }
        return true
      }

    const submitHandler = async (e) => {
        e.preventDefault()
       if(validateSignIn(email, password)){
        try {
            loginUser({email, password})
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
       }
    }
  return (
   <Row className="justify-content-center">
    <Col md={7}>
    <Card className="shadow-md shadow-green-300">
    
    <Card.Body>
    <h3 className="font-semibold">Log In</h3>
    {error && <Message variant='danger'>{error.response.data.message}</Message>}
  
  <Form onSubmit={submitHandler}>
     <Form.Group controlId='email' className='my-3'>
      <Form.Label className="font-semibold">Email Address</Form.Label>
      <Form.Control 
         type='email' 
         placeholder='Enter Email' 
         value={email}
         onChange={(e) => setEmail(e.target.value)}>
      </Form.Control>
     </Form.Group>
     <Form.Group controlId='password' className='my-3'>
      <Form.Label className="font-semibold">Password</Form.Label>
      <Form.Control 
         type='password' 
         placeholder='Enter Password' 
         value={password}
         onChange={(e) => setPassword(e.target.value)}>
      </Form.Control>
     </Form.Group>
     <button type='submit'  
       className='bg-green-600 text-white uppercase rounded  px-2 text-sm
       py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
       ease-in-out active:bg-green-800 hover:scale-105 my-2' >
        Sign In
     </button>
    
  </Form>
  
  
  New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} 
                 style={{textDecoration: 'none'}}
                 className="text-green-700">Register
               </Link>
  
    </Card.Body>
  
   </Card>
    </Col>
   </Row>
 
  )
}

export default Login
