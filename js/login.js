$(function(){
        $('.lv-login-body__btn').click(function(){
            $.post('http://localhost:3333/api/login',{
                username:$('input[name="username"]').val(),
                password:$('input[name="password"]').val()
            },function(res){
                console.log(res.data);
                if(res.code==0){
                     // 将信息存入localStorage中
                    localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));

                    //将token存储起来
                    localStorage.setItem('token',res.data.token);

                    location.href="/";
                }else{
                    alert(res.msg);
                }
        })
    })



})