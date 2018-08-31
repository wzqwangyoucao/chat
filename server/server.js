const express = require('express')
const userRouter = require('./user')//引入
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')//获取模型

const app = express();
//和express配合
// //将webpack和socket.io统一起来
// //和HTTP协议接口统一起来
const server = require('http').Server(app);
const io = require('socket.io')(server)

io.on('connection',function(socket){
    // console.log('user login');
    socket.on('sendmsg',function(data){
        console.log(data)
        // io.emit('recvmsg',data)
        const {from ,to ,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))//...展开符
        })
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

