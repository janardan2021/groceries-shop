import { useState, useEffect } from "react"
import {Form, Row, Col} from 'react-bootstrap'
import {toast} from 'react-toastify'

import { useUsersContext } from "../hooks/useUsersContext"
import { useUpdateUser } from "../hooks/usersHooks"

const ProfileInfo = () => {
    const {state: user, dispatch} = useUsersContext()
    const {mutate: updateUser, data: userUpdatedData} = useUpdateUser()
    const [name, setName] = useState(user ? user.name : '')
    const [email, setEmail] = useState(user ? user.email : '')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
        
        if(validateRegister(name, email, password, confirmPassword)) {
            try {
                updateUser({name, email, password})
                dispatch({type : 'LOGIN', payload: {...user, name, email}})
                toast.success('Profile updated successfully')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
        
    }

  useEffect(() => {
        if(userUpdatedData?.data) {
            dispatch({type : 'LOGIN', payload: userUpdatedData.data})
            localStorage.setItem('user' , JSON.stringify(userUpdatedData.data))
        }
    }, [userUpdatedData , dispatch])
//    if(userUpdatedData) console.log(userUpdatedData.data )
  return (
    <div>
      <Row className="justify-content-center"> 
      <Col md={7} className="shadow-md shadow-green-300">
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
               <Form.Group controlId='name' className='my-2'>
                   <Form.Label className='font-semibold'>Name</Form.Label>
                   <Form.Control 
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                   </Form.Control>
               </Form.Group>
               <Form.Group controlId='email' className='my-2'>
                   <Form.Label className='font-semibold'>Email address</Form.Label>
                   <Form.Control 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                   </Form.Control>
               </Form.Group>
               <Form.Group controlId='password' className='my-2'>
                   <Form.Label className='font-semibold'>Password</Form.Label>
                   <Form.Control 
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                   </Form.Control>
               </Form.Group>
               <Form.Group controlId='confirmPassword' className='my-2'>
                   <Form.Label className='font-semibold'>Confirm password</Form.Label>
                   <Form.Control 
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                   </Form.Control>
               </Form.Group>
               <button type="submit" variant='primary' 
               className="bg-green-600 text-white uppercase rounded  px-2 text-sm
               py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
               ease-in-out active:bg-green-800 hover:scale-105 my-4">
                  Update
               </button>
               {/* {loadingUpdateProfile && <Loader />} */}
            </Form>
        </Col>
      </Row>
    </div>
  )
}

export default ProfileInfo
