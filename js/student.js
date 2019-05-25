var Student={
    //需要用到的数据
    data:{
        list:[], //当前学生的集合
        totalPage:1, //总页数
        pageNum:1, //当前的页数
        pageSize:10, //每页的信息条数
        searchName:'' //搜索的姓名
    },


    //查询学生信息
    findStudent:function(){
        $.ajax({
            url:'http://localhost:3333/api/stu',
            method:'get',
            headers:{
                'access_token':localStorage.getItem('token')
            },
            data:{
                pageNum:Student.data.pageNum,
                pageSize:Student.data.pageSize,
                name:Student.data.searchName
            },
            success:function(res){
                if(res.code==0){
                    Student.data.list=res.data.list;
                    Student.data.totalPage=res.data.totalPage;
    
                    let html=ejs.render(
                        $('#list').html(),
                        {
                            list:Student.data.list
                        }
                    )
    
                    let pageHtml=ejs.render(
                        $('#page').html(),
                        {
                            num: Student.data.totalPage,
                            pageNum: Student.data.pageNum
                        }
                    )
                    $('#myTable tbody').html(html);
                    $('#myPage').html(pageHtml);
                }else{
                    alert('网络异常，请稍后重试');
                }
            }
        })



        // $.get('http://localhost:3333/api/stu',{
        //     pageNum:Student.data.pageNum,
        //     pageSize:Student.data.pageSize,
        //     name:Student.data.searchName
        // },function(res){
        //     if(res.code==0){
        //         Student.data.list=res.data.list;
        //         Student.data.totalPage=res.data.totalPage;

        //         let html=ejs.render(
        //             $('#list').html(),
        //             {
        //                 list:Student.data.list
        //             }
        //         )

        //         let pageHtml=ejs.render(
        //             $('#page').html(),
        //             {
        //                 num: Student.data.totalPage,
        //                 pageNum: Student.data.pageNum
        //             }
        //         )
        //         $('#myTable tbody').html(html);
        //         $('#myPage').html(pageHtml);
        //     }else{
        //         alert('网络异常，请稍后重试');
        //     }
        // })
    },

    //添加学生
    addStudent:function(name,age){
        $.ajax({
            url:'http://localhost:3333/api/stu',
            method:'post',
            data:{
                name:name,
                age:age
            },
            headers:{
                'access_token':localStorage.getItem('token')
            },success:function(){
                if(res.code==0){
                    $('#myModal').modal('hide');
                    alert(res.msg);
                    Student.findStudent();
                    }else{
                        alert(res.msg);
                    }
            }
        })


        // $.post('http://localhost:3333/api/stu',{
        //     name:name,
        //     age:age
        // },function(res){
        //     if(res.code==0){
        //     $('#myModal').modal('hide');
        //     alert(res.msg);
        //     Student.findStudent();
        //     }else{
        //         alert(res.msg);
        //     }
        // })
    },


    //绑定事件
    bind:function(){
        //分页效果
        $('#myPage').on("click","li",function(){
            let toPage=$(this).data('num'); //要去的页数
            //判断点击的页数是否为当前的页数 如果不是则发送请求
            if(toPage!==Student.data.pageNum){
                Student.data.pageNum=toPage;  
                Student.findStudent();
            }
        })

        //搜索功能
        $('#searchBtn').click(function(){
            Student.data.searchName=$('#searchInput').val();
            Student.data.pageNum=1;
            Student.findStudent();
        })

        // 点击新增加按钮弹出 新增学生的模态框 
        $('#openModal').click(function(){
            $('#myModal').modal();
        })

        //点击提交按钮 发送ajax请求
        $('#addStudent').click(function(){
            let name=$('#stuName').val();
            let age=$('#stuAge').val();
          
            Student.addStudent(name,age);
            $('#myModal').modal('hide');
        })
    }
}




$(function(){
    Student.findStudent();
    Student.bind();
})