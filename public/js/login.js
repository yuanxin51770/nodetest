$(function(){
    // 注册
    $('#register').click(function(){
        $.ajax({
            url:'/register',
            type:'POST', //GET
            async:true,    //或false,是否异步
            data:{
                "username":$('#register_name').val(),
                "r_password":$('#register_psd').val(),
                "password":$('#re_register_psd').val()
            },
            timeout:5000,    //超时时间
            dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success:function(data,textStatus,jqXHR){
                if(data.statusCode == '200'){
                    alert(data.message);
                    //$('#registerModal').hide();
                }
                else{
                    alert(data.message);
                }
            }
        })
    });
    // 登录
    $('#loginin').click(function(){
        $.ajax({
            url:'/login',
            type:'POST', //GET
            async:true,    //或false,是否异步
            data:{
                "username":$('#username').val(),
                "password":$('#password').val()
            },
            timeout:5000,    //超时时间
            dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success:function(data,textStatus,jqXHR){
                alert(data.message);
            }
        })
    });
});