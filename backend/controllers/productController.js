import {asyncHandler} from '../middlewares/asyncHandler.js';
import Product from '../models/product.js'
import mongoose from 'mongoose';

import { cloudinary, storage } from '../cloudinary/index.js';



const getProducts = asyncHandler(async (req,res) => {                                
    const products = await Product.find({})
    // console.log(products)
    res.json(products)
})

const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        // console.log(product)
        return res.json(product)
    }else {
        res.status(404)
        throw new Error('Resource not found')
    }
    
})

const getProductsByCategory = asyncHandler(async (req,res) => {
    const {category} = req.params
    let products
    if(category === 'All'){
        products = await Product.find({})
    }else {
        products = await Product.find({'category': category})
    }
    if (products) {
        // console.log(products)
        return res.json(products)
    }else {
        res.status(404)
        throw new Error('Resource not found')
    }
    
})

const createProduct = asyncHandler(async (req,res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: '6506b68559b8fca6cd9ee8f7',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Others',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const uploadImage = asyncHandler(async (req,res) => {
    // console.log(req.file)
    const product = await Product.findById(req.params.id) 
    if(product) {
        product.image = req.file.path;
        await product.save()
    } else {
        res.status(404)
        throw new Error('Resourse not found')
    }  
    res.status(201).json({url : req.file.path})
})

const updateProduct = asyncHandler(async (req,res) => {
    const {name, price, description, brand,
          category, countInStock } = req.body
          console.log(req.body)
    const product = await Product.findById(req.params.id) 
    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save()
        console.log(updatedProduct)
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Resourse not found')
    }  
})

const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id) 
    if(product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'Product deleted'})
    } else {
        res.status(404)
        throw new Error('Resourse not found')
    }  
})

const createProductReview = asyncHandler(async (req,res) => {
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id) 
    if(product) {
       const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
       )
       if(alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
       }
       const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
       }

       product.reviews.push(review)
       product.numReviews = product.reviews.length
       product.rating = 
           product.reviews.reduce((acc, review) => acc + review.rating, 0) /
           product.reviews.length
       await product.save()
       res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('Resourse not found')
    }  
})

// @desc get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.status(200).json(products)
})


export {getProducts, createProduct, updateProduct, uploadImage, getProductsByCategory,
     deleteProduct, getProductById, createProductReview, getTopProducts}