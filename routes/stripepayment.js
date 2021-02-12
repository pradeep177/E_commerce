const express = require("express");
const router = express.Router();
const {makepayment} = require('../controllers/stripepayment')
//const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.post('/stripepayment', makepayment)

module.exports = router