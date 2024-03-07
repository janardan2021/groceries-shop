import express from 'express'
const router = express.Router();

import { protect, admin } from '../middlewares/authenticate.js'
import { validateUser } from '../middlewares/validations.js';

import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser

 } from '../controllers/userController.js'


router.route('/').post(validateUser, registerUser).get(getUsers)

router.post('/logout', logoutUser);

// router.post('/login', loginUser)
router.route('/login').post(validateUser, loginUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(deleteUser)
                    .get(getUserByID)
                    .put(updateUser)

export default router;