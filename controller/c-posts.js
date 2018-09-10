const userModel=require('../lib/mysql')
const checkLogin=require('../middlewares/check').checkLogin
const checkNotLogin=require('../middlewares/check').checkNotLogin
const moment=require('moment')()
const md = require('markdown-it')(); 

//获取——文章列表页面
exports.getPosts= async ctx => {
    let data;
    console.log("ctx:",ctx.session);
    await userModel.findAllPost().then(res=>{
        console.log("res",res);
        data=res;
    })
    await ctx.render('posts',{
        session:ctx.session,
        posts:data,
    })
}

//获取——发表页面
exports.getCreatePage = async ctx => {
    await ctx.render('publishArticle',{
        session:ctx.session
    })
}

//发表文章
exports.publishArticle = async ctx => {
    let { title , content } = ctx.request.body,
        name = ctx.session.user,
        id = ctx.session.id,
        time=moment.format('YYYY-MM-DD HH:mm:ss'),
        avator;
    //查找用户头像
    await userModel.findUserData([id]).then((res)=>{
        if(res.length>0){
            avator=res[0]['avator']
        }
    })  
    //插入数据    
    await userModel.insertPost([name,title,md.render(content),content,id,time,avator])
        .then(res => {
            // console.log("res==============",res)
            ctx.body={
                code:200,
                message:'发表成功'
            }

        }).catch(err=>{
            console.log(err);
            ctx.body = {
                code: 500,
                message: '发表文章失败'
            }
        })
}

