require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const cors = require('cors');

//All the routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const stripeRoutes = require('./routes/stripepayment')

const app = express();

//ports
const port = process.env.PORT || 8000;

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', orderRoute);
app.use('/api', stripeRoutes);


//connection to the database
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(() => {
    console.log("DB CONNECTED")
})

//starting the server
app.listen(port, () => {
    console.log(`port started at port ${port}`);
})