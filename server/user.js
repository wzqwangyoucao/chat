const express = require('express');//中间件
const utils = require('utility')//加密
const Router = express.Router();//user express的router 路由对象进行挂在
const model = require('./model')
const User = model.getModel('user')//获取模型
const Chat = model.getModel('chat')//获取模型
const _filter = {'pwd':0,'__v':0}
// Chat.remove({},function(e,d){});

Router.get('/list',function(req,res){
    const {type} = req.query//????????????????????????query是什么
    //get的参数用query的参数获取


    // User.remove({},function(e,d){});//删除所有
    User.find({type},function(err,doc){
        // console.log(doc);
        return res.json({code:0,data:doc})
    })
})
Router.post('/readmsg',function(req,res){
    // console.log(req.body)
    const userid = req.cookies.userid;
    const {from} = req.body;
    Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},function(err,doc){
        console.log(doc);
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})
Router.post('/register',function(req,res){//引入body-parser
    // console.log(req.body)
    const{user,pwd,type}=req.body
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            //{'pwd':0}不允许字段显示
            if(e){
                return res.json({code:1,msg:'后端出错'})
            }
            const {user,type,_id} = d;
            // console.log(d);//{ _id: 5b89598a95374f1044b13137,
                            // user: '1',
                            // type: 'genius',
                            // pwd: '6b46273149e170f62cd6f88e10d0b3c4',
                            // __v: 0 }
          
            res.cookie('userid'),_id;
            return res.json({code:0,data:{user,type,_id}})
        })


        // User.create(,)
    })
})
Router.post('/update',function(req,res){
    const userid = req.cookies.userid//这里怎么就没有传入cookie就直接校验了
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){//用户ID，修改所有数据  处理函数
        const data = Object.assign({},{//做数据合并
            user:doc.user,
            type:doc.type,
        },body)
        console.log(data);
        return res.json({code:0,data})
    })
})
Router.post('/login',function(req,res){//引入body-parser
    console.log(req.body)
    const{user,pwd}=req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误或者用户名不存在'});
        }
        res.cookie('userid',doc._id)//保持登录状态 
        return res.json({code:0,data:doc})

    })
})
Router.get('/info',function(req,res){//挂载
    //用户有没有cookie
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

Router.get('/getmsglist',function(req,res){
    // console.log(req.cookies)
    const user = req.cookies.userid;
    User.find({},function(e,userdoc){
        let users={};
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
            // Chat.find({'$or':[{from:user,to:user}]},function(err,doc){
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){//找出from或者to是发送者的聊天
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })

    // // Chat.find({'$or':[{from:user,to:user}]},function(err,doc){
    // Chat.find({},function(err,doc){
    //     if(!err){
    //         return res.json({code:0,msgs:doc})
    //     }
    // })
})

function md5Pwd(pwd){
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router;//导出