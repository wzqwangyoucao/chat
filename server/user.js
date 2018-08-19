const express = require('express');//中间件
const Router = express.Router();//user express的router 路由对象进行挂在
const model = require('./model')
const User = model.getModel('user')//获取模型

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
})

Router.post('/register',function(req,res){//引入body-parser
    console.log(req.body)
    const{User,pwd,type}=req.body
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }
        User.create({user,pwd,type},function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错'})
            }
            return res.json({code:0})
        })
    })
})

Router.get('/info',function(req,res){//挂载
    //用户有没有cookie
    return res.json({code:1})
})

module.exports = Router;//导出