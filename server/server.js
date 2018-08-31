const express = require('express')
const userRouter = require('./user')//引入
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const app = express();
//和express配合
// //将webpack和socket.io统一起来
// //和HTTP协议接口统一起来
const server = require('http').Server(app);
const io = require('socket.io')(server)

io.on('connection',function(socket){
    // console.log('user login');
    socket.on('sendmsg',function(data){
        console.log('123');
        io.emit('recvmsg',data)
    })
})


app.use(cookieParser())
app.use(bodyParser.json())//这样可以解析post传输的数据

app.use('/user',userRouter)//开启中间件   子路由

// app.get('/book',function(req,res,next){
//     res.send('book');
// })


server.listen(9093,function(){
    console.log('Node app start port at 9093');
})

