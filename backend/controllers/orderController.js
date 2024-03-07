import {asyncHandler} from '../middlewares/asyncHandler.js'
import Order from '../models/order.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config();


 const stripe = new Stripe(process.env.STRIPE_CLIENT)

// This is a helper function
const getSessonUrl = async (order) => {
   //  Prepare for stripe
   const taxRate = await stripe.taxRates.create({
    display_name: 'Sales Tax',
    inclusive: false,
    percentage: 10.00,
    description: 'Sales Tax',
  });
// console.log('tax rate is done')
  const line_items = [];
  order.orderItems.forEach((item) => {
    line_items.push(
        {
          price_data: {
              currency: "usd",
              product_data: {name: item.name },
              unit_amount: Math.floor(item.price * 100),
              },
          quantity: item.qty,
          tax_rates: [taxRate.id]
    }
    )
  }) 
  // console.log('Tax rate and line items done')
  try {
    // console.log('creating a session')
    const session = await stripe.checkout.sessions.create({
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1000,
              currency: 'usd',
            },
            display_name: 'Shipping Price',
          },
        }
      ],
      line_items: line_items,
      client_reference_id: JSON.stringify(order._id),
      payment_method_types: ["card"],
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
     success_url: (process.env.NODE_ENV === 'production') ? `${process.env.APP_URL}order/${order._id}` 
                                                      : `http://localhost:3000/order/${order._id}`,
     cancel_url:(process.env.NODE_ENV === 'production') ? `${process.env.APP_URL}order/${order._id}` 
                                                    : `http://localhost:3000/order/${order._id}`
                                        
   })
  //  console.log(session)
   return {url: session.url }
   } catch (error) {
    return error
   }
 
  
}

// @desc Create new order
// @route POST /api/orders
// @access PRIVATE
// This will create an order in the database and return the session url to the client
const createOrder = asyncHandler(async (req,res) => {
  let createdOrder
  const {
     orderItems,
     shippingAddress,
     itemsPrice,
     taxPrice,
     shippingPrice,
     totalPrice
   } = req.body
//  console.log(req.body)
   if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
   } else {
      const order = new Order({
        orderItems: orderItems.map((x) => ({...x , product: x._id, _id: undefined})),
      //   user is added to request object after authentication middleware is run
        user: req.user._id,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      })
      
    createdOrder = await order.save()
      // console.log(createdOrder)
   }
  
   const sessionUrl = await getSessonUrl(createdOrder)
   // console.log('--------URL--------------------',sessionUrl)
   if (sessionUrl?.url) {
     
     res.send(sessionUrl)
   }else {
     res.status(404)
     throw new Error('Session cannot be established')
   }

})

// @desc Get a checkout url for an unpaid ordr
// @route get /api/orders/checkout/:id'
// @access PRIVATE
const getCheckoutSession = asyncHandler (async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  const sessionUrl = await getSessonUrl(order)
  // console.log('--------URL--------------------',sessionUrl)
  if (sessionUrl?.url) {
    res.send(sessionUrl)
  }else {
    res.status(404)
    throw new Error('Session cannot be established')
  }
})


// @desc Create a webhook to listen to stripe events sent from stripe
// @route post /api/orders/webhook
const getStripeEvent = asyncHandler (async (req, res) => {
  //  console.log(req.body)
  // Signature verification
  const payload = req.rawBody
  const sig = req.headers['stripe-signature']
  const endpointSecret= process.env.ENDPOINT_SECRET

  let event;
  try {
     event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    //  console.log(req.body)
    //  console.log(event)

  } catch (err){
     console.log(err.message)
     res.status(400).json({success: false})
     return;
  }
  
  if (event?.data?.object.object === 'checkout.session' 
     && event.data.object.status === 'complete'
     && event.data.object.payment_status === 'paid'){
    console.log(event.data.object.payment_status)
    const order = await Order.findById(JSON.parse(event.data.object.client_reference_id))
    console.log(order)
    if (order) {
       order.isPaid = true
       order.paidAt = Date.now()
       order.paymentResult = {
          id: event.data.object.payment_intent,
          status: 'complete',
          update_time:Date.now().toString() ,
          email_address: event.data.object.customer_details.email
       }
       await order.save() 
       }
     }

    // Handle the event
    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }
   res.json({success:true})
})
// @desc get logged in user's orders
// @route GET /api/orders/mine
// @access PRIVATE
const getMyOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id})
    res.status(200).json(orders)
 })

 // @desc get order by ID
// @route GET /api/orders/:id
// @access PRIVATE
const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
                             .populate('user', 'name email')
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }                        
 })



//   // @desc update order to paid
// // @route PUT /api/orders/:id/pay
// // @access PRIVATE
// const updateOrderToPaid = asyncHandler(async (req,res) => {
//     const order = await Order.findById(req.params.id)
//     if (order) {
//       order.isPaid = true
//       order.paidAt = Date.now()
//       order.paymentResult = {
//          id: req.body.id,
//          status: req.body.status,
//          update_time: req.body.update_time,
//          email_address: req.body.payer.email_address
//       }
//       const updatedOrder = await order.save()
//       res.status(200).json(updatedOrder)
//     } else {
//       res.status(404)
//       throw new Error('Order not found')
//     }
//  })

   // @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access PRIVATE / admin
const updateOrderToDelivered = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
 })

 // @desc get all orders
// @route GET /api/orders/
// @access PRIVATE
const getAllOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders)
 })

export {createOrder, getOrderById, getMyOrders, getCheckoutSession,
   getStripeEvent, getAllOrders, updateOrderToDelivered}

//  export {createOrder,
//          getMyOrders,
//         getOrderById,
//         updateOrderToPaid,
//         getCheckoutSession,
//         updateOrderToDelivered,
//         getOrders,
//         getStripeEvent
//     }