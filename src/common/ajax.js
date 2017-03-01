define(function(require, exports, module) {
    module.exports = function(json) {
        var type = json.type || 'GET';
        var url = json.url;
        var success = json.success;
        var error = json.error || false;
        var data = json.data || "";


        //1、创建AJAX对象
        var OAjax;
        try {
            //Firefox,Opera 8.0+, Safari
            OAjax = new XMLHttpRequest();
        } catch (e) {
            //Internet Explorer
            try {
                OAjax = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    OAjax = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    alert("你的浏览器不支持AJAX!");
                    return false;
                }
            }
        }

        //2、连接服务器
        OAjax.open(type, url, true);

        //3、发送请求
        OAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        OAjax.send(data);

        //4、接受数据
        OAjax.onreadystatechange = function() {
            if (OAjax.readyState == 4) {
                if (OAjax.status == 200) {
                    var data = OAjax.responseText;
                    success(data);
                } else {
                    if (error) {
                        error();
                    }
                }

            }
        }
    }
})
