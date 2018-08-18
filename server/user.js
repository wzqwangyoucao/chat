const express = require('express');//中间件
const Router = express.Router();//user express的router 路由对象进行挂在
const model = require('./model')
const User = model.getModel('user')

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
Router.post('/register',function(req,res){
    console.log(req.body.data)
    const{User,pwd,type}=req.body.data
    User.findOne({user:user},function(){
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }else{
            User.create({user,pwd,type},function(e,d){
                if(e){
                    return res.json({code:1,msg:'后端出错'})
                }
                return res.json({code:0})
            })
        }
    })
})
Router.get('/info',function(req,res){//挂载
    //用户有没有cookie
    return res.json({code:1})
})

module.exports = Router;//导出