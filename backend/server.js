import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path'

dotenv.config()
const port = process.env.PORT || 4000
const app = express()

// Files imports
import {notFound, errorHandler} from './middlewares/errorHandler.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
      }
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())


// app.use((req, res, next) => {
//     console.log(req.path, '**********', req.method)
//     next()
// })

// __dirname is /Users/janardan/Desktop/groceries-shop
const __dirname = path.resolve()
// console.log('__dirname', __dirname)
app.use(express.static('files'))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.send('API is running.....')
})

if(process.env.NODE_ENV === 'production') {
    // Provide the static folder that has client side files
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    // Any route that is not api will be directed to index.html
    app.get('*', (req, res) => 
      res.sendFile(path.resolve(__dirname, 'frontend', 'build' , 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running.....')
    })
    
}


app.use(notFound)
app.use(errorHandler)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        .then(() => {
                // Listen for request
                app.listen(port, () => {
                    console.log(`MongoDB connected and listening on port ${port}!!!`)
                })
        })
        .catch((error) => {
            console.log('DATABASE CONNECTION ERROR', error)
        })
