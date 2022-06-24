const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// const auth = require('./routes/auth');
const user = require('./model/users');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
dotenv.config({ path: './config.env' });


app.get('/', function (req, res) {

   console.log("hey");

})

app.use(cors(
   {
      origin:'https://e-kart-front.vercel.app', 
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200
  }
   ))

app.use(express.json());
app.use(cookieParser());
app.use(require('./routes/auth'));


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

//

// app.use(cors(
//     {
//         origin: "*",
//         methods: ["GET", "POST"],
//         credentials: true,
//     }
// ))




// app.listen(4420, () => {
//     console.log('listening 5000......');
// });