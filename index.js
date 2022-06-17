const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// const auth = require('./routes/auth');
const user = require('./model/users');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");



dotenv.config({path: './config.env'});

app.use(cors(
    {
        origin: "http://127.0.0.1:3000",
        methods:["GET" , "POST"],
        credentials: true,
    }
))

app.use(cors(corsOptions));

app.use(express.json());


app.use(cookieParser());

app.use(require('./routes/auth'));


app.listen(5000, ()=>{
    console.log('hello abc');
});