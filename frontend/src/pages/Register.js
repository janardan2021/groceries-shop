import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
// import { useDispatch, useSelector } from "react-redux";
import { useUsersContext } from "../hooks/useUsersContext.js"
import { Form, Row, Col ,Card} from "react-bootstrap";
import { useRegisterUser } from "../hooks/usersHooks.js";
// import { useRegisterMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
import Message from "../components/Message.js";


import React from 'react'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [register, {isLoading}] = useRegisterMutation()

    // const {userInfo} = useSelector((state) => state.auth)
    const {mutate: registerUser, data: userData, error} = useRegisterUser()
    const {user, dispatch: userDispatch} = useUsersContext()

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    if (userData && !user) {
        userDispatch({type: 'LOGIN', payload: userData.data})
        localStorage.setItem('user' , JSON.stringify(userData.data))
    }

    useEffect(() => {
        if (user) {
            navigate(redirect)
            
        }
    }, [user, navigate, redirect])

    function validateRegister(name, email, password, confirmPassword) {
        if(password===null || password ==='' || password===undefined){
          toast.error('Please enter your password!')
          return false
        }
        if(email===null || email ==='' || email===undefined){
          toast.error('Please enter your email!')
          return false
        }
        if(name===null || name ==='' || name===undefined){
            toast.error('Please enter your name!')
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

        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
            return false
        }
        return true
      }

    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log({name, email, password})
        
           if(validateRegister(name, email, password, confirmPassword)) {
            try {
                registerUser({name, email, password})
                
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
    <h3 className="font-bold">Sign Up</h3>
    {error && <Message variant='danger'>{error.response.data.message}</Message>}
    <Form onSubmit={submitHandler}>
    <Form.Group controlId='name' className='my-3'>
        <Form.Label className="font-semibold">Name</Form.Label>
        <Form.Control 
           type='text' 
           placeholder='Enter Name' 
           value={name}
           onChange={(e) => setName(e.target.value)}>
        </Form.Control>
       </Form.Group>
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
       <Form.Group controlId='confirmPassword' className='my-3'>
        <Form.Label className="font-semibold">Confirm Password</Form.Label>
        <Form.Control 
           type='password' 
           placeholder='Confirm Password' 
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}>
        </Form.Control>
       </Form.Group>
       <button type='submit' variant='primary' 
         className='bg-green-600 text-white uppercase rounded  px-2 text-sm
         py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
         ease-in-out active:bg-green-800 hover:scale-105' >
          Register
       </button>
       {/* {isLoading && <Loader />} */}
    </Form>
    <div className="my-2">
        Already a Customer? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'} 
        className="font-semibold text-green-700" style={{textDecoration: 'none'}}>Sign In</Link>
    </div> 
    </Card.Body>
    </Card>
   
    </Col>
  </Row>
  )
}

export default Register
