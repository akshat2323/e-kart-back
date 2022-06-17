const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const auth = require('./routes/auth');
const user = require('./model/users');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");



dotenv.config({path: './config.env'});


app.use(express.json());


app.use(cookieParser());

app.use(require('./routes/auth'));


app.listen(5000, ()=>{
    console.log('hello abc');
});