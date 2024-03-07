import express from 'express'
const router = express.Router();

import {createOrder, getOrderById, getMyOrders,
       getCheckoutSession, getStripeEvent, getAllOrders
      ,updateOrderToDelivered} from '../controllers/orderController.js'

// import {
//     addOrderItems,
//          getMyOrders,
//         getOrderById,
//         updateOrderToPaid,
//         updateOrderToDelivered,
//         getOrders,
//         getCheckoutSession,
//         getStripeEvent

//  } from '../controllers/orderController.js'

 import { protect , admin} from '../middlewares/authenticate.js'

router.route('/').post( protect, createOrder)
router.route('/').get(protect, admin, getAllOrders)
// router.route('/').post(protect, addOrderItems)
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/checkout/:id').get(protect, getCheckoutSession)
// router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/webhook').post(getStripeEvent)
export default router;