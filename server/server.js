const express = require('express')
const userRouter = require('./user')//引入
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser())
app.user(bodyParser.json())//这样可以解析post传输的数据

app.use('/user',userRouter)//开启中间件   子路由

// app.get('/book',function(req,res,next){
//     res.send('book');
// })


app.listen(9093,function(){
    console.log('Node app start port at 9093');
})