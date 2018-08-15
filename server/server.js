const express = require('express')
const userRouter = require('./user')


const app = express();
app.use('/user',userRouter)//开启中间件

// app.get('/book',function(req,res,next){
//     res.send('book');
// })

app.listen(9093,function(){
    console.log('Node app start port at 9093');
})