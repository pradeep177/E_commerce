const express = require('express');
const router = express.Router();

const { 
    getUserById,
    getUser,
    updateUser,
    userPurchaseList
    } = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
// _:user_id_ parameter could automatically load a user's 
//information from the database without any additional code
router.param("userId", getUserById);

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);
router.get('/orders/user/:userId', isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;