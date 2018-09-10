const router=require('koa-router')()
const controller =require('../controller/c-posts')

//文章列表页面
router.get('/posts',controller.getPosts)   

//发表文章页面
router.get('/publishArticle',controller.getCreatePage)

//发表文章
router.post('/publishArticle',controller.publishArticle)

module.exports=router