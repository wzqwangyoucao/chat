const express = require('express');//中间件
const Router = express.Router();//user express的router 路由对象进行挂在

Router.get('/info',function(req,res){
    return res.json({code:1})
})

module.exports = Router;