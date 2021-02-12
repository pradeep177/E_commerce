const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');

const userSchema = new Schema({
    name: {
        type:String,
        required:true,
        maxLength:32,
        trim:true
    },
    lastName: {
        type:String,
        maxLength:32,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    encry_password: {
        type:String,
        required:true
    },
    userinfo: {
        type:String,
        trim:true
    },
    salt:String,
    privilege: {
        type:Number,
        default:0
    },
    purchase:{
        type:Array,
        default:[]
    }
},{ timestamps: true });
//timestamps option that tells Mongoose to automatically 
//manage createdAt and updatedAt properties on your documents


userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securedPassword(password);
    })
    //The virtuals get method is a function returning a the virtual value.
    .get(function(){
        return this._password
    })


userSchema.methods = {
    //authenticate user when revisit with the same password
    authenticate: function(plainpassword){
        return this.securedPassword(plainpassword) === this.encry_password
    },
    //encrypting the plain password
    securedPassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword) //updates the password
            .digest('hex')
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model('User', userSchema);