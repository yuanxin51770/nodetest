var Utils = {};
// 判断ajax返回
Utils.getajax = function(data, showalert){
    if(data.statusCode == '301'){
        alert(data.message);
        window.location.href = 'index.html';
    }
    else if(data.statusCode == '200'){
        if(showalert){
            alert(data.message);
        }
        return true;

    }
    else{
        alert(data.message);
    }
}