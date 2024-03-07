import express from 'express'
const router = express.Router();
import { storage } from '../cloudinary/index.js';
import multer from 'multer'
const upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' })


import {getProducts, createProduct,  updateProduct, uploadImage, deleteProduct,
     getProductById, createProductReview, getTopProducts, getProductsByCategory} from '../controllers/productController.js';

router.route('/').get(getProducts)
router.route('/').post(createProduct)
// router.route('/uploadimage').post(upload.single('image'), uploadImage)
router.route('/:id/uploadimage').post(upload.single('image'), uploadImage)
router.route('/top', getTopProducts)
router.route('/:id')
    .get(getProductById)
    .post(updateProduct)
    .delete(deleteProduct)

router.route('/filter/:category')
    .get(getProductsByCategory)

router.route('/:id/reviews').post(createProductReview)

export default router;