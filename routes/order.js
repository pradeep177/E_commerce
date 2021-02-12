const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { 
    getOrderById, 
    createOrder, 
    getAllOrders,
    getOrderStatus,
    updateOrderStatus 
} = require('../controllers/order');
const { updateStock } = require('../controllers/product');

//params
router.param('userId', getUserById);
router.param('orderId', getOrderById);

//create route
router.post(
    '/order/create/:userId',
    isSignedIn, 
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
);

//read order
router.get(
    '/order/all/:userId',
    isSignedIn, 
    isAuthenticated,
    isAdmin,
    getAllOrders
);

//status of the order
router.get(
    "/order/status/:userId",
    isSignedIn, 
    isAuthenticated,
    isAdmin,
    getOrderStatus
);
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn, 
    isAuthenticated,
    isAdmin,
    updateOrderStatus
);

module.exports = router;