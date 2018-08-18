const express = require('express')
const userRouter = require('./user')//引入
const bodyParser = require('body-parser')
const cookieParer = require('cookie-parser')

const app = express();
app.use(cookieParer())
app.user(bodyParser.json())
app.use('/user',userRouter)//开启中间件   子路由

// app.get('/book',function(req,res,next){
//     res.send('book');
// })


app.listen(9093,function(){
    console.log('Node app start port at 9093');
})