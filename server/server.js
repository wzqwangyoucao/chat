const express = require('express');
//引入模块 相当于引入了function的原型

const mongoose = require('mongoose');
//引入库
const DB_URL = 'mongodb://127.0.0.1:27017/react';
//链接mongo 并且使用react集合
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongo connect seccess');
}) 

//                          user是key 文档名字   值
const User = mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},//true表示字段是必须要有的
    age:{type:Number,require:true}
}))
新增数据
User.create({
    user:'react',
    age:18,
},function(err,doc){
    if(!err){
        console.log(doc);
    }
    else{
        console.log(err);
    }
})
//类似于mysql mongo里面有文档 字段的概念
const app = express();
//使用function//创建了对象

app.get('/',function(req,res){//请求 相应
    res.send('<h1>Hello Word</h1>')//返回数据的方法
})
app.get('/data',function(req,res){//请求 相应
    User.find({},function(err,doc){
        res.json(doc);
    })
    res.json({name:0,course:1});//返回数据的方法

})
app.listen(9093,function(){
    console.log('Node app start port at 9093');
})
//使用了对象的方法

//app.get app.post分别开发get和post接口
//app.use使用模块
//DOM的模块复杂起来之后，
//我们不可能把所有的 路由都写到一个文件，
//拆出来形成一个单独的模块写成一个文件
//主文件里面使用use引用该模块即可
//res.send,res.json,res.sendfile响应不同的内容
//文本   json   文件