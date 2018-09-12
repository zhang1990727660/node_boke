module.exports={
    //已经登陆了
    checkNotLogin:(ctx)=>{
        console.log("middlewares************:",ctx);
        if(ctx.session && ctx.session.user){
            ctx.redirect('/posts');
            return false;
        }
        return true;
    },
    //没有登陆
    checkLogin:(ctx)=>{
        if(!ctx.session || !ctx.session.user){
           ctx.redirect('/signin');
           return false; 
        }
        return true;
    }
}