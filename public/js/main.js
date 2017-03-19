$(function(){
    var mainObj = {};
    // 获取博客内容
    mainObj.getBlogs = function(){
        $.ajax({
            url:'/blogget',
            type:'GET', //GET
            async:true,    //或false,是否异步
            data:{

            },
            timeout:5000,    //超时时间
            dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            success:function(data,textStatus,jqXHR){
                if(Utils.getajax(data)){
                    if(data.records) {
                        mainObj.createBlog(data.records);
                    }
                }
            }
        })
    };
    // 创建博客
    mainObj.createBlog = function(records){
        for(var i = 0; i < records.length; i++){
            var dom = $('<div class="personblogdiv">'
            +'<div class="main_photodiv">'
            +'<img src="images/headImgs/yx.jpg" class="img-circle perimg">'
            +'</div>'
            +'<div class="mian_chatdiv">'
            +'<h6>'+decodeURI(records[i].username)+'</h6>'
            +'<h6>'+decodeURI(records[i].content)+'</h6>'
            +'<a class="glyphicon glyphicon-envelope"></a><span class="header_tips">信息</span>'
            +'<a class="glyphicon glyphicon-envelope"></a><span class="header_tips">信息</span>'
            +'<a class="glyphicon glyphicon-envelope"></a><span class="header_tips">信息</span>'
            +'<a class="glyphicon glyphicon-envelope"></a><span class="header_tips">信息</span>'
            +'</div>'
            +'</div>');
            $('#blogmain').append(dom);
        }
    };
    mainObj.getBlogs();
    // 发送微博
    $('#blogsend_text').keydown(function(e){
        var value = $(this).val();
        if(e.keyCode == 13){
            $(this).val('');
            //模拟点击登陆按钮，触发上面的 Click 事件
            $.ajax({
                url:'/blogsend',
                type:'POST', //GET
                async:true,    //或false,是否异步
                data:{
                    content:value
                },
                timeout:5000,    //超时时间
                dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success:function(data,textStatus,jqXHR){
                    Utils.getajax(data, true);
                }
            })
        }
    });
})