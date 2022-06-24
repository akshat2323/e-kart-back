const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const User = require('../model/users');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
require('../db/cnn');


router.get('/home', (req,res) =>{
    console.log("home page");
    return res.status(200).json({ body: "welcome to home" });
});
router.post('/signup', (req, res) => {
    const { name, phone, address, dob, email, password, cpassword } = req.body;

    if (!name || !phone || !address || !dob || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Please Fill All The Fields" });
    }
    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            return res.status(422).json({ error: "sorry this user already exist" });
        } else {
            if (password != cpassword) {
                return res.status(422).json({ error: "Password dose not match" });
            } else {
                const user = new User({ name, phone, address, dob, email, password, cpassword });
                
                user.save().then(() => {
                    res.status(201).json({ msg: "user registered successfully" });
                }).catch((err) => { res.status(422).json({ error: "couldnt register" }) } );
            }
        }

    }).catch((err) =>{ res.json({ error: err }) } );
})


router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "enter your email" });

        }

        const userLogin = await User.findOne({ email: email });
        const match = await bcrypt.compare(password, userLogin.password);
        let token = userLogin.generateAuthToken();
        res.cookie('ekartoken', token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true
        });

        if(!match){
            return res.status(422).json({ error: "Entered Something Wrong" });
        }else{
            return res.status(201).json({msg:"Logged In"});
        }

    } catch (error) {
        res.status(422).json({ error: error });
    }


});


router.get('/home', authentication, (req,res)=>{
  console.log('Hellow from about page');
  res.status(201);
});

router.get('/lgout', (req,res)=>{
    res.clearCookie('ekartoken', {path: '/'});
    res.status(200).send("user logged out");
  });


module.exports = router;