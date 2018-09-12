const userModel=require('../lib/mysql')
const checkLogin=require('../middlewares/check').checkLogin
const checkNotLogin=require('../middlewares/check').checkNotLogin
const moment=require('moment')()
const md = require('markdown-it')(); 

//获取——文章列表页面
exports.getPosts= async ctx => {
    let data;
    await userModel.findAllPost().then(res=>{
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
    await userModel.findUserData([id]).then(res=>{
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

//单篇文章页
exports.getSinglePosts = async ctx => {
    let pId=ctx.params.postId,
        posts,
        comment;

    //查询文章详情    
    await userModel.findDataById(pId).then(res => {
        posts=res[0]
    })
    //查询评论列表
    await userModel.findCommentById(pId).then(res => {
        comment=res
    })
    //渲染
    await ctx.render('articleDetail',{
        session:ctx.session,
        posts:posts,
        comment:comment
    })

}

//增加评论信息
exports.addComment = async ctx => {
    let { commentCon , postId }=ctx.request.body,
        userName=ctx.session.user,
        userId=ctx.session.id,
        time=moment.format('YYYY-MM-DD HH:mm:ss'),
        avator;
   
    //查找用户信息
    await userModel.findUserData(postId).then(res=>{
        avator=res[0].avator
    })
    //插入评论信息
    await userModel.insertComment([userId,userName,md.render(commentCon),time,postId,avator])
    //修改评论条数
    await userModel.addPostCommentCount(postId).then(res=>{
        ctx.body={
            code:200,
            message:'评论成功'
        }
        
    }).catch(err=>{
        ctx.body={
            code:500,
            message:'评论失败'
        }
    })
}

//查询我的文章列表
exports.myArticle = async ctx => {
    let userId=ctx.session.id,
        posts;
    await checkLogin(ctx)
    await userModel.findPostByUserPage(userId,1).then(res => {
        posts=res  
        
    }).catch(err => {
        console.log(err)
    })

    await ctx.render('myArticle',{
        session:ctx.session,
        posts:posts
    })
}

//删除指定的文章
exports.deletePosts = async ctx => {
    let postId=ctx.params.postId
    await checkLogin(ctx)
    await userModel.deletePost(postId).then(res=>{
        ctx.body={
            code:200,
            message:'删除成功'
        }
    }).catch(err=>{
        ctx.body={
            code:500,
            message:'删除失败'
        }
    })
}

//显示要编辑的文章
exports.editArticle = async ctx => {
    let postId=ctx.params.postId,
        posts;
    await checkLogin(ctx)
    await userModel.findDataById(postId).then(res=>{
        posts=res[0]
    }).catch(err=>{
        console.log(err);
    })

    await ctx.render('edit',{
        session:ctx.session,
        posts:posts
    })
} 
