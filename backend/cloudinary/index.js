import {v2 as cloudinary} from "cloudinary"
// const cloudinary = require('cloudinary').v2;
import { CloudinaryStorage } from 'multer-storage-cloudinary'


// Required to access environment variables
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage ({
    cloudinary,
    params: {
        folder: 'Groceries-shop',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

export  {
    cloudinary,
    storage
}