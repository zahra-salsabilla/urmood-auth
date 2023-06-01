require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001
const RouteUser = require('./routes/User');
const mongoose = require('mongoose');
const e = require('express');
const userModel = require('./models/user.model');
/** 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
*/

//conncet to database mongoDB
mongoose.connect("mongodb://salsa:passwordPrompt@34.101.252.16:27017/?authMechanism=DEFAULT&authSource=admin")
.then(() => {
    console.log('database terhubung')
})
.catch(() => {
    console.log('database tidak terhubung')
})

app.use(bodyParser.json());
app.use('/', RouteUser)

app.listen(PORT, (res, req) => {
    console.log(`server run port ${PORT}`)
})

