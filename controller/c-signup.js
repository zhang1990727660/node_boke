const userModel=require('../lib/mysql')
const md5=require('md5')
const moment=require('moment')()
const checkNotLogin=require('../middlewares/check.js').checkNotLogin
const checkLogin=require('../middlewares/check.js').checkLogin

exports.getSignup=async ctx=>{
    console.log("ctx:",ctx);
    // await checkNotLogin()
    await ctx.render('signup',{
        // session:ctx.session
    })
}

exports.postSignup=async ctx=>{
    let {name,password,repeatpass,avator} =ctx.request.body
    await userModel.findUserByName(name)
    .then(async (result)=>{
        if(result[0].count>=1){
            //用户已经存在
            ctx.body={
                code:500,
                message:'用户已经存在'
            }
        }else{
            await userModel.insertData([name,md5(password),'',moment.format('YYYY-MM-DD HH:mm:ss')])
                .then(res=>{
                    ctx.body={
                        code:200,
                        message:'注册成功'
                    }
                })
        }
    })
}
