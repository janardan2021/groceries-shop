import { LinkContainer } from "react-router-bootstrap"
import { Table} from "react-bootstrap"
import { FaTrash, FaTimes, FaEdit, FaCheck } from "react-icons/fa"
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
// import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice"
import { useDeleteUser, useGetAllUsers } from "../../hooks/usersHooks"
import { useEffect } from "react"

const UserListPage = () => {
//   const {data: users, isLoading, error, refetch } = useGetUsersQuery()
//   const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation()
  const {data: users, isLoading, error, refetch} = useGetAllUsers()
  const {mutate: deleteUser, idLoading: loadingDelete,
         isError: isDeleteError, error:deleteError, data: deleteData} = useDeleteUser()
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure to delete the user?')) {
         deleteUser(id)
        // toast.success('Successfully deleted user')
         refetch()
    }
  }

useEffect(() => {
  if(isDeleteError) {
    toast.error(deleteError.message)
  }
  if(deleteData?.data) {
    toast.success('User deleted')
  }
}, [isDeleteError, deleteData, deleteError])

  return (
    <div className='shadow-md shadow-green-300 py-2 px-4'>
     <h2>Users</h2>
     {loadingDelete && <Loader />}
     {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.message}</Message> : (
      <Table striped hover responsive className="table-sm">
        <thead>
         <tr>
          <th><span className='text-green-700'>ID</span></th>
          <th><span className='text-green-700'>NAME</span></th>
          <th><span className='text-green-700'>EMAIL</span></th>
          <th><span className='text-green-700'>ADMIN</span></th>
          <th></th>
         </tr>
        </thead>
        <tbody>
          {users.data.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>
                {user.isAdmin ? (
                  <FaCheck style={{color: 'green'}} />
                ) : (<FaTimes style={{color: 'red'}}/>)}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <button 
                   className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                   py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                   ease-in-out active:bg-green-800 hover:scale-105 mx-2">
                    <FaEdit />
                  </button>
                </LinkContainer>
                <button 
                        className="bg-red-600 text-white uppercase rounded  px-2 text-sm
                        py-1 shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 
                        ease-in-out active:bg-red-800 hover:scale-105 mx-2"
                        onClick={() => deleteHandler(user._id)}>
                    <FaTrash style={{color: 'white'}} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     )}
    </div>
  )
}

export default UserListPage
