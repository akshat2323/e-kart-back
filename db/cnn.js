const express = require('express');
const mongoose = require('mongoose');


const DB ="mongodb+srv://akt:akshat@cluster0.sfhry.mongodb.net/E-kart?retryWrites=true&w=majority";

const cnn = mongoose.connect(DB).then(()=>{
    console.log('connection successful');
}).catch((err)=>{
    console.log(err);
});


module.exports = cnn;