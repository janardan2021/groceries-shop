import axios from 'axios'
import { useQuery , useMutation, useQueryClient} from "@tanstack/react-query"

// Get all products
const fetchProducts= () => {
        return axios.get('/api/products')
}
export const useProductsData = () => {
    return useQuery({queryKey: ['products'], queryFn: fetchProducts})
}

// get product by id
const fetchProductById = ({queryKey}) => {
    // console.log(queryKey)
    const id = queryKey[1]
    return axios.get(`/api/products/${id}`)
}
export const useProductById = (id) => {
    return useQuery({queryKey: ['productId', id], queryFn: fetchProductById})
}

// get product by id
const fetchProductsByCategory = ({queryKey}) => {
    // console.log(queryKey)
    const category = queryKey[1]
    return axios.get(`/api/products/filter/${category}`)
}
export const useProductsByCategory = (category) => {
    return useQuery({queryKey: ['productCategory', category], queryFn: fetchProductsByCategory})
}

// create a product
const createProduct = () => {
     return axios.post('/api/products')
}
export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationFn: createProduct, onSuccess: () => {
        queryClient.invalidateQueries('products')
    }})
}

// upload image and get url
const uploadImage = (data) => {
    return axios.post(`/api/products/${data.productId}/uploadimage`, data.formData, {headers: {
        "Content-Type": "multipart/form-data"
      }})
}
export const useUploadImage = () => {
   const queryClient = useQueryClient()
   return useMutation({mutationFn: uploadImage, onSuccess: () => {
       queryClient.invalidateQueries('products')
   }})
}

// Update a product
const updateProduct = (data) => {
    return axios.post(`/api/products/${data.productId}`, data.updatedProduct, {headers: {
        'Content-Type': 'application/json'
      }})
}
export const useUpdateProduct = () => {
   const queryClient = useQueryClient()
   return useMutation({mutationFn: updateProduct, onSuccess: () => {
       queryClient.invalidateQueries('products')
   }})
}

// delete a product
const deleteProduct = (id) => {
    return axios.delete(`/api/products/${id}`)
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: ['deleteId'], mutationFn: deleteProduct,
                            onSuccess: () => {
                                queryClient.invalidateQueries('products')
                            }
         })
}



