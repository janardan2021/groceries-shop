import { LinkContainer } from "react-router-bootstrap"
import { Table,Row, Col} from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
// import { useParams } from "react-router-dom"
// import Paginate from "../../components/Paginate"
import { useProductsData , useCreateProduct, useDeleteProduct} from "../../hooks/productsHooks"
// import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"

const ProductListPage = () => {
    // const pageNumber = useParams()
    // const {data, isLoading, error, refetch} = useGetProductsQuery(pageNumber)
    const {data: productsData, isLoading, isError: error} = useProductsData()
    const {mutate: deleteProduct} = useDeleteProduct()
    const {mutate: createProduct} = useCreateProduct()
    // const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()
    // const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation()
    // console.log(products)
    const deleteHandler = async (id) => {
      if (window.confirm('Are you sure to delete the product?')) {
        try {
            console.log('the key to be deleted is ', id)
            deleteProduct(id)
            toast.success('Product deleted')
            // refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.error) 
        }
      }
    }
    const createProductHandler = async () => {
        if(window.confirm('Are you sure you want to create a new product?')) {
            try {
                createProduct()
                // refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    // if(productsData) console.log(productsData)
  return (
   
    <div className='shadow-md shadow-green-300 py-2 px-4'>
     <Row className="align-items-center">
        <Col>
          <p className="text-4xl font-bold">All products</p>
        </Col>
        <Col className="text-end">
            <button onClick={createProductHandler} 
            className="bg-green-600 text-white uppercase rounded  px-2 text-sm
            py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
            ease-in-out active:bg-green-800 hover:scale-105">
                <FaEdit /> Create product
            </button>
        </Col>
     </Row>
     {/* {loadingCreate && <Loader />} */}
     {/* {loadingDelete && <Loader />} */}
     {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {productsData.data.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <button variant="light" 
                                className="bg-green-600 text-white uppercase rounded  px-2 text-sm
                                py-1 shadow-md hover:bg-green-700 hover:shadow-lg transition duration-150 
                                ease-in-out active:bg-green-800 hover:scale-105 mx-2">
                                    <FaEdit />
                                </button>
                            </LinkContainer>
                            <button onClick={() => deleteHandler(product._id)} variant="danger" 
                            className="bg-red-600 text-white uppercase rounded  px-2 text-sm
                            py-1 shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 
                            ease-in-out active:bg-red-800 hover:scale-105 mx-2">
                                <FaTrash style={{color:'white'}}/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </Table>
          {/* <Paginate pages={data.pages} page={data.page} isAdmin={true}/> */}
        </>
     )}
    </div>
  )
}

export default ProductListPage
