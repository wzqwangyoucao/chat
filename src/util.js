
//工具函数
export function getRedirectPath({type,avatar}){
    //根据用户信息 返回跳转地址
    // user.type /boss /genius
    // user.avatar /bossinfo  /geniusinfo 头像
    let url = (type === 'boss')?'/boss':'/genius'
    if(!avatar){
        url += 'info'
    }
    console.log(arguments)
    return url
}

export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_')
}