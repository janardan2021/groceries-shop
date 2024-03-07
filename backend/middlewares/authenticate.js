import  jwt from "jsonwebtoken";
import {asyncHandler} from "./asyncHandler.js";
import User from "../models/user.js";

// Protect middleware ----> to check if the user is logged in
const protect = asyncHandler (async (req, res, next) => {
    let token;
    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
       try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // find the user with decoded.userID from the database and add it 
        // to the req object so we can have access to it in all routes
        req.user = await User.findById(decoded.userId).select('-password')
        next()
       } catch (error) {
        console.log(error)
        res.status(401);
        throw new Error('Not authorized, token verification failed')
       }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }

})

// We will use protect middleware before the admin middleare
// therefore we will have access to the req.user

// Admin middleware ----> To check if the user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized, not an admin')
    }
}

export {protect, admin}
