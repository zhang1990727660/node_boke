$(".submit").on("click",function(){
    let user=$("input[name='name']")
    let pass=$("input[name='password']")
    if(checked.checkName(user) && checked.checkPass(pass)){
        $.ajax({
            url:'/signin',
            data:$('.form').serialize(),
            type:'POST',
            dataType:'JSON',
            success:function(res){
                if(res.code===200){
                    fade('登录成功')
                    setTimeout(function(){
                        window.location.href='/posts'
                    },1000)
                }else{
                    fade(res.message)
                }
            },
            error: function () {
                alert('异常');
            }
        })
    }
});


var checked={
    isNotEmpty:function(value){
        if(!value){
            return false
        }
        return true
    },
    regMatch:function(value,reg){
        if(!value.match(reg)){
            return false
        }
        return true
    },
    /**
     * 检查用户名
     */
    checkName:function(id){
        let value=$(id).val();
        if(!this.isNotEmpty(value)){
            fade('用户名不能为空')
            return false
        }else{
            // let flag=checked.regMatch(value,/[<'">]/g)
            // if(!flag){
            //     fade('请输入合法字符！')
            //     return false
            // }
            return true;
        }
    },
    /**
     * 检查密码
     */
    checkPass:function(passId,rePassId){
        let pass_1=$(passId).val()
        if(!this.isNotEmpty(pass_1)){
            fade("密码不能为空");
            return false;
        }
        if(rePassId){
            let pass_2=$(rePassId).val()
            if(!this.isNotEmpty(pass_2)){
                fade('确认密码不能为空')
                return false
                
            }
            if(pass_1!==pass_2){
                fade('两次密码输入不一致')
                return false
            }
        }
        
        return true
    },
    /**
     * 检查用户头像
     */
    checkAvator:function(id){
        var value=$(id).val();
        if(!this.isNotEmpty(value)){
            fade('请上传用户头像')
            return false
        }
        return true
    }
}