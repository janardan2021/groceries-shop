import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Row, Col, Card } from "react-bootstrap"
import {toast} from 'react-toastify'
// import { useUpdateProductMutation,
//         useGetProductDetailsQuery,
//         useUploadProductImageMutation} from "../../slices/productsApiSlice"
import Loader from "../../components/Loader"
import {useProductById, useUploadImage, useUpdateProduct} from '../../hooks/productsHooks'


const ProductEditPage = () => {
    const {id: productId} = useParams()

    const {data: product, isLoading} = useProductById(productId)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    // const [category1, setCategory1] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')

    const categories = ['Fruits', 'Vegetables', 'Meat', 'Dairy', 'Pantry']
    let updatedCategories = []
    if(category !== '') {
        updatedCategories = categories.filter((item) => item !== category)
    }

    const counter = useRef(0)

    
    const {mutate: updateProduct} = useUpdateProduct()
    const {mutate: uploadImage, data: imageUrl} = useUploadImage()
    // const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation()
    // const [uploadProductImage, {isLoading: loadingUpload}] = useUploadProductImageMutation()
    const navigate = useNavigate()

//    console.log('counter', counter.current)
    
   
    useEffect(() => {
        if(imageUrl){
             setImage(imageUrl.data.url)
         } 
         if(product && counter.current === 0) {
           setName(product.data.name)
           setPrice(product.data.price)
           setBrand(product.data.brand)
           setImage(product.data.image)
           setCategory(product.data.category)
           setCountInStock(product.data.countInStock)
           setDescription(product.data.description) 
           counter.current = counter.current + 1
        }
    }, [product, imageUrl])


    const submitHandler = async (e) => {
        e.preventDefault()
        console.log('Form submitted')

        const updatedProduct = {productId, name, price, description, 
                               brand, category, countInStock}
        updateProduct({productId, updatedProduct})
        navigate('/admin/productlist')
    }

    const uploadFileHandler = async (e) => {
        // console.log(e.target.files[0])
        // setImage((image) => e.target.files[0])
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append('image', file)
        
        // console.log(formData.get('image'))
        try {
            uploadImage({productId, formData})
            toast.success('Image successfully uploaded')
            // setImage(res.image)
        } catch (err) {
           toast.error(err?.data?.message || err.error)
        }
    }
// console.log(category)
  return (
    <Row className="justify-content-center">
    <Col md={7}>
    <Card className="shadow-md shadow-green-300">
    
    <Card.Body>
   <Link to='/admin/productList'>
    <button className="bg-green-600 text-white uppercase rounded  px-2 text-sm
       py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
       ease-in-out active:bg-green-800 hover:scale-105 my-2">Go Back</button></Link>
 
      <h3>Edit Product</h3>
      {/* {loadingUpdate && <Loader />} */}
      {isLoading ? <Loader />  : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
                <Form.Label className='font-semibold'>Name</Form.Label>
                <Form.Control type="text" 
                           placeholder="Enter name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="price" className="my-2">
                <Form.Label className='font-semibold'>Price per lb</Form.Label>
                <Form.Control type="number" 
                           placeholder="Set price"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
                <Form.Label className='font-semibold'>Image</Form.Label>
                <Form.Control type="text" 
                              placeholder="Enter image url"
                              value={image}
                              onChange={(e) => setImage(e.target.value)}>
                </Form.Control>
                <Form.Control type="file"
                              label= "Choose file"
                              onChange={uploadFileHandler}>
                </Form.Control>
            </Form.Group>
            {/* {loadingUpload && <Loader />} */}
            <Form.Group controlId="brand" className="my-2">
                <Form.Label className='font-semibold'>Brand</Form.Label>
                <Form.Control type="text" 
                           placeholder="Set brand"
                           value={brand}
                           onChange={(e) => setBrand(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
                <Form.Label className='font-semibold'>CountInStock</Form.Label>
                <Form.Control type="number" 
                           placeholder="Set countInStock"
                           value={countInStock}
                           onChange={(e) => setCountInStock(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
                <Form.Label className='font-semibold'>Category</Form.Label>
                {/* <Form.Control type="text" 
                           placeholder="Set category"
                           value={category}
                           onChange={(e) => setCategory(e.target.value)}>
                </Form.Control> */}
                <Form.Select  type="text" 
                              onChange={(e) => setCategory(e.target.value)}>
                                <option key={category} value={category}>{category}</option>
                            { updatedCategories.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            {/* <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
                <Form.Label className='font-semibold'>description</Form.Label>
                <Form.Control type="text" 
                           placeholder="Set description"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <button type="sumbit"
                    className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                    py-2 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                    ease-in-out active:bg-green-800 hover:scale-105 my-2">Update</button>
        </Form>
      )}
  
   </Card.Body>
  
  </Card>
   </Col>
  </Row>
  )
}

export default ProductEditPage
