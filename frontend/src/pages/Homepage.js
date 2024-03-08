import {  useProductsByCategory} from "../hooks/productsHooks.js"
import Product from "../components/Product.js"
import Loader from "../components/Loader.js"


import {Row, Col } from "react-bootstrap"
import { useState } from "react"



const Homepage = () => {
const [filter, setFilter] = useState('All')
// const {isLoading, data} = useProductsData()
const {data, isLoading} = useProductsByCategory(filter)

// if(data) {
//   console.log(data)
// }
// console.log(filter)

// if(data) console.log(data)
  return (
    <div className="flex flex-col">
      <div>
        <ul className="flex justify-around flex-wrap ">
          <li onClick={() => setFilter('All')}
             className={`text-lg font-semibold text-green-700 cursor-pointer hover:scale-x-105 border-b-2
                        hover:border-green-700 transition ease-in-out px-3 py-1
                        ${filter === 'All' ? 'border-green-700' : ''}`}>All Products</li>
          <li onClick={() => setFilter('Fruits')}
             className={`text-lg font-semibold text-green-700 cursor-pointer hover:scale-x-105 border-b-2
                        hover:border-green-700 transition ease-in-out px-3 py-1
                        ${filter === 'Fruits' ? 'border-green-700' : ''}`}>Fruits</li>
          <li onClick={() => setFilter('Vegetables')}
             className={`text-lg font-semibold text-green-700 cursor-pointer hover:scale-x-105 border-b-2
                        hover:border-green-700 transition ease-in-out px-3 py-1
                        ${filter === 'Vegetables' ? 'border-green-700' : ''}`}>Vegetable</li>
          <li onClick={() => setFilter('Dairy')}
             className={`text-lg font-semibold text-green-700 cursor-pointer hover:scale-x-105 border-b-2
                        hover:border-green-700 transition ease-in-out px-3 py-1
                        ${filter === 'Dairy' ? 'border-green-700' : ''}`}>Dairy</li>
          <li onClick={() => setFilter('Meat')}
             className={`text-lg font-semibold text-green-700 cursor-pointer hover:scale-x-105 border-b-2
                        hover:border-green-700 transition ease-in-out px-3 py-1
                        ${filter === 'Meat' ? 'border-green-700' : ''}`}>Meat</li>
          <li onClick={() => setFilter('Pantry')}
             className={`text-lg font-semibold text-green-700 cursor-pointer hover:scale-x-105 border-b-2
                        hover:border-green-700 transition ease-in-out px-3 py-1
                        ${filter === 'Pantry' ? 'border-green-700' : ''}`}>Pantry</li>
          <li onClick={() => setFilter('Others')}
             className={`text-lg font-semibold text-green-700 cursor-pointer hover:scale-x-105 border-b-2
                        hover:border-green-700 transition ease-in-out px-3 py-1
                        ${filter === 'Others' ? 'border-green-700' : ''}`}>Others</li>
        </ul>
      </div>

      <div>
        {isLoading && <Loader />}
        <Row className="justify-content-center">
          {data?.data?.length === 0 && (
            <div className=" text-rose-500 text-center py-10 bg-green-100 rounded-md">Sorry! We don't have any items in the selected category in stock.</div>
          )}
        {data && data.data.map((product) => (
             <Col  key={product._id} xs={10} md={6} lg={4} xl={3} >
                       <Product product={product} />
              </Col>   
          ))}
        </Row>

    </div>
    </div>
  )
}

export default Homepage
