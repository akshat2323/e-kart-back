const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { then } = require('../db/cnn');

const userS = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    subscription: {
        type: Number
    }
});



userS.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 15);
        this.cpassword = await bcrypt.hash(this.cpassword, 15);
    }
    next();
});


userS.methods.generateAuthToken = function () {
    try {

        let token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY );
        
        this.tokens = this.tokens.concat({ token: token});
        this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}



const User = mongoose.model('USER', userS);

module.exports = User;