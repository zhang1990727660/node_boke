const router = require('koa-router')()

router.get("/signout",ctx => {
    ctx.session=null
    ctx.body={
        code:200,
        message:'退出成功'
    }
})

module.exports=router