const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
const { check } = require('express-validator');

router.post('/signup',
   [
   check('name')
   .isLength({ min: 3 }).withMessage('name must be at least 3 chars long')
   .isLength({ max: 25 }).withMessage(' name must be max 25 chars long'),
   check('email')
    .isEmail().withMessage('Please enter valid email'), 
    check('password')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    .isLength({ max: 25 }).withMessage('must be max 25 chars long')
    .matches(/\d/).withMessage('must contain a number')
    //.isAlphanumeric().withMessage('password must be alphanumeric')
    //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage
    //('Password should be combination of one uppercase , one lower case,
    // one special char, one digit and min 8 , max 20 char long'),
  ],
   signup);

router.post('/signin',
   [
   check('email')
    .isEmail().withMessage('Please enter valid email'), 
    check('password')
    .isLength({ min: 1 }).withMessage('Password can\'t be empty')
  ],
   signin);


router.get('/signout', signout)

module.exports = router;