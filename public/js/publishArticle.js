$(".submit").click(function(){
    let tId=$("input[name='title']")
    let conId=$("textarea[name='content']")
    if(checked.checkTitle(tId) && checked.checkContent(conId)){
        $.ajax({
            url:'/publishArticle',
            data:$(".form").serialize(),
            type:'POST',
            dataType:'JSON',
            success:function(res){
                if(res.code===200){
                    fade('发表成功')
                }else{
                    fade(res.message)
                }    
            }
        })
    }

})

var checked={
    isNotEmpty:function(value){
        if(!value){
            return false
        }
        return true
    },
    //检查标题
    checkTitle:function(id){
        let value=$(id).val()
        if(!this.isNotEmpty(value)){
            fade('标题不能为空')
            return false
        }
        return true
    },
    //检查内容
    checkContent:function(id){
        let value=$(id).val();
        if(!this.isNotEmpty(value)){
            fade('内容不能为空')
            return false
        }
        return true
    }
}