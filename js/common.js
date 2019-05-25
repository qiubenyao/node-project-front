// 1. 判断用户是否登录，如果登录才可以显示它要去的页面，否则将他跳转回登录页面
let userInfo=localStorage.getItem('userInfo');
userInfo=userInfo ? JSON.parse(userInfo):null;
// console.log(userInfo);

if(!userInfo){
    location.href='./login.html';
}else{
    console.log(userInfo.username);
  $('.nickname').html(userInfo.username);    //用户名
  $('.avator').attr('src', userInfo.avatar);  //设置用户头像
}


$('#open').click(function(){
    $('#myModal2').modal();
})


$('#ok').click(function(){
    var formData=new FormData();
    formData.append('avatar',$('input[name="avatar"]')[0].files[0]);

    $.ajax({
        url:'http://localhost:3333/api/user/upload',
        method:'POST',
        headers: {
            'access_token': localStorage.getItem('token'),
        },
        data:formData,
        processData:false,  //发送请求时禁止ajax对文件进行编码
        contentType:false,  //发送请求时禁止ajax对文件进行编码
        success:function(res){
            if(res.code==0){
                $('.avator').attr('src',res.data.avatar);

                //更新本地存储
                var userInfo=JSON.parse(localStorage.getItem('userInfo'));
                userInfo.avatar=res.data.avatar;
                localStorage.setItem('userInfo',JSON.stringify(userInfo));
            }else{
                alert(res.msg);
            }
            $('#myModal2').modal('hide');
        }
    })
})