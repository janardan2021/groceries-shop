import axios from 'axios'
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query"

const createOrder = (data) => {
    return axios.post('/api/orders', data, {headers: {
        'Content-Type': 'application/json'
      }
    })
}
export const useCreateOrder = () => {
    return useMutation({mutationFn: createOrder})
}

const getMyOrders = () => {
    return axios.get('/api/orders/mine')
}
export const useGetMyOrders = () => {
    return useQuery({queryKey: ['myorders'], queryFn: getMyOrders})
}

const getOrderDetails = ({queryKey}) => {
    const id = queryKey[1]
    return axios.get(`/api/orders/${id}`)
}
export const useGetOrderDetails = (id) => {
    return useQuery({queryKey: ['orderId', id], queryFn: getOrderDetails})
}

const getCheckoutSessionUrl =({queryKey}) => {
    const id = queryKey[1]
    return axios.get(`/api/orders/checkout/${id}`)
}
export const useGetCheckoutSessionUrl = (id) => {
    return useQuery({queryKey: ['checkoutUrl', id], queryFn: getCheckoutSessionUrl})
}

const getAllOrders = () => {
    return axios.get('/api/orders')
}
export const useGetAllOrders = () => {
    return useQuery({queryKey: ['allorders'], queryFn: getAllOrders})
}

const markDelivered = (id) => {
    return axios.put(`/api/orders/${id}/deliver`)
}

export const useMarkDelivered = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: ['markdelivered'], mutationFn: markDelivered,
                            onSuccess: () => {
                                queryClient.invalidateQueries('allorders')
                            }
         })
}









