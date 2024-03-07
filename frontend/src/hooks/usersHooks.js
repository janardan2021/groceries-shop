import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'

const registerUser = (data) => {
    
    return axios.post('/api/users', data, {headers: {
        'Content-Type': 'application/json'
      }
    })
}

const loginUser = (data) => {
    
    return axios.post('/api/users/login', data, {headers: {
        'Content-Type': 'application/json'
      }
    })
}

const logoutUser = () => {
    
    return axios.post('/api/users/logout')
}

const updateUser = (data) => {
    return axios.put('/api/users/profile', data, {headers: {
        'Content-Type': 'application/json'
      }
    })
}

export const useRegisterUser = () => {
    return useMutation({mutationFn: registerUser})
}

export const useLoginUser = () => {
    return useMutation({mutationFn: loginUser})
}

export const useLogoutUser = () => {
    return useMutation({mutationFn: logoutUser})
}

export const useUpdateUser = () => {
    return useMutation({mutationFn: updateUser})
}

const getUsers = () => {
    return axios.get('/api/users/')
}

export const useGetAllUsers = () => {
    return useQuery({queryKey: ['allusers'], queryFn: getUsers})
}

// get user by id
const getUserById = ({queryKey}) => {
    const id = queryKey[1]
    return axios.get(`/api/users/${id}`)
}
export const useGetUserById = (id) => {
    return useQuery({queryKey: ['userId', id], queryFn: getUserById})
}

const editUser = (data) => {
    return axios.put(`/api/users/${data.userId}`, data, {headers: {
        'Content-Type': 'application/json'
      }
    })
}
export const useEditUser = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationFn: editUser , onSuccess: () => {
        queryClient.invalidateQueries('allusers')}})
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}
export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationFn: deleteUser,  onSuccess: () => {
        queryClient.invalidateQueries('allusers')}
    })
}