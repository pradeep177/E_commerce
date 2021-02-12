//const { findByIdAndUpdate } = require('../models/user');
const User = require('../models/user');
const Order = require('../models/order')

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: `No user was found in DB ${err}`
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res ) => {
    //TO DO get back here for password
     req.profile.salt = undefined;
     req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true, useFindAndModify:false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error:`you are not authorized to update ${err}`
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    )
}

exports.userPurchaseList = (res, req) => {
    Order.find({user:req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                err:`No order in this account ${err}`
            })
        }
        return res.json(order)
    })
}

//middleware
exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    //in order we loop through products pick individual info create object push it inside purchases 
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })
    //store this in DB
    User.findOneAndUpdate(
        { _id:req.profile._id},
        {$push: {purchases:purchases}},
        {new: true},
        (err, purchases) => {
            if (err){
               return res.status(400).json({
                   error:`Unable to save purchase list ${err}`
               }) 
            }
            next();
        }
    )
};