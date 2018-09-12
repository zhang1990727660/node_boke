const router=require('koa-router')()
const controller =require('../controller/c-posts')

router.get('/',ctx=>{
    ctx.redirect("/posts");
})  

//文章列表页面
router.get('/posts',controller.getPosts)   

//发表文章页面
router.get('/publishArticle',controller.getCreatePage)

//发表文章
router.post('/publishArticle',controller.publishArticle)

//单篇文章页
router.get("/posts/:postId",controller.getSinglePosts)

//提交评论信息
router.post('/comment',controller.addComment)

//我的文章
router.get("/myArticle",controller.myArticle) 

//删除指定的文章
router.get('/deletePosts/:postId',controller.deletePosts)

//编辑文章
router.get('/edit/:postId',controller.editArticle)


module.exports=router