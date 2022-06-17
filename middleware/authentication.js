const jwt = require('jsonwebtoken');
const User = require('../model/users');



const Authentication = async  (req, res, next)=> {

    try {
        
        const token = req.cookies.ekartoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const muser = await User.findOne({_id : verifyToken._id, "tokens.token":token});
        res.send(muser);
        if(!muser){ throw new Error('User Not Found') }


        req.token = token;
        req.muser = muser;
        req.userId = muser._id;

        

        next();

    } catch (error) {
        res.status(401).send('Unautherised" No Token Found');
        console.log(error);
    }

}


module.exports = Authentication;