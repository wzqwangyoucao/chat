const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat';
mongoose.connect(DB_URL);


const models = {
    // 模型
    user:{
        // 字段
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{'type':String,require:true},
        // 头像
        'avatar':{'type':String},
        //个人简介
        'desc':{'type':String},
        //职位名
        'title':{'type':String},
        // boss字段多两个   公司  钱
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{

    }
}

for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}