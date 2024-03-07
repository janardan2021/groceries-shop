import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Form, Row, Col, Card } from "react-bootstrap"
import Message from "../../components/Message"
import {toast} from 'react-toastify'
// import { useUpdateUserMutation,
        // useGetUserDetailsQuery} from "../../slices/usersApiSlice"
import { useGetUserById , useEditUser} from "../../hooks/usersHooks"
import Loader from "../../components/Loader"


const UserEditPage = () => {
    const {id: userId} = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const {data: user, isLoading, refetch, error } = useGetUserById(userId)
    const {mutate: editUser} = useEditUser()
    // const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation()
    // const navigate = useNavigate()
    
   

    useEffect(() => {
        if(user?.data) {
           setName(user.data.name)
           setEmail(user.data.email)
           setIsAdmin(user.data.isAdmin)
        }
        
       
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault()
        editUser({userId, name, email, isAdmin})
        toast.success('User updated successfully')
        refetch()
        // navigate('/admin/userlist')
    }

   

  return (
    <Row className="justify-content-center">
    <Col md={7}>
   

    <Card className="shadow-md shadow-green-300">  
    <Card.Body>
    <Link to='/admin/userlist'>
        <button  
    className="bg-green-600 text-white uppercase rounded  px-2 text-sm
    py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
    ease-in-out active:bg-green-800 hover:scale-105">Go Back
    </button>
    </Link>
      <h3>Edit User</h3>
      {/* {loadingUpdate && <Loader />} */}
      {isLoading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" 
                           placeholder="Enter name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" 
                           placeholder="Set email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin' className="my-2">
                <Form.Check 
                    type="checkbox"
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}>
                </Form.Check>
            </Form.Group>
            <button type="sumbit"
                    className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                    py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                    ease-in-out active:bg-green-800 hover:scale-105">
                        Update
            </button>
        </Form>
      )}
   </Card.Body>
   </Card>

   </Col>
   </Row>
  )
}

export default UserEditPage

