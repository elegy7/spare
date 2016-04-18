define(function(require, exports, module){
    require('message/message.css')
    var siAlert = null
    /*弹出框*/
    var message = function(msg, option, callback){
        if(siAlert) clearTimeout(siAlert)
        $('.still-msg').remove()
        $('body').append("<div class='still-msg " + option + "'>"+
                            '<div class="still-inner-msg">'+
                                '<span>' + msg + '</span>'+
                                '<span class="still-inner-close" type="button">×</span>'+
                            '</div>'+
                          '</div>')
        $('.still-inner-close').click(function(){
            $('.still-msg').fadeOut(300,function(){
                $(this).remove()
            })
            if(siAlert) clearTimeout(siAlert)
            callback()
        })
        // 点击空白处关闭提示框, 以免验证提示时挡住输入框
        $('.still-msg').click(function(e){
            if($(e.target).closest('.still-inner-msg').length == 0){
                $('.still-inner-close').trigger('click')
            }
        })
        if(option.indexOf('lock') != -1) return
        siAlert = setTimeout(function(){
            $('.still-msg').fadeOut(300,function(){
                $(this).remove()
            })
            callback()
        },3000)
    }
    exports.show = function(msg,lock){
        callback = typeof arguments[arguments.length-1]=='function' ? arguments[arguments.length-1] : function(){}
        option = ''
        if(lock) option = 'lock'
        message(msg, option, callback)
    }

    exports.warning = function(msg,lock){
        callback = typeof arguments[arguments.length-1]=='function' ? arguments[arguments.length-1] : function(){}
        option = 'warning'
        if(lock) option = option+' lock'
        message(msg, option, callback)
    }

    exports.info = function(msg,lock){
        callback = typeof arguments[arguments.length-1]=='function' ? arguments[arguments.length-1] : function(){}
        option = 'info'
        if(lock) option = option+' lock'
        message(msg, option, callback)
    }

    exports.success = function(msg,lock){
        callback = typeof arguments[arguments.length-1]=='function' ? arguments[arguments.length-1] : function(){}
        option = 'success'
        if(lock) option = option+' lock'
        message(msg, option, callback)
    }

    exports.error = function(msg,lock){
        callback = typeof arguments[arguments.length-1]=='function' ? arguments[arguments.length-1] : function(){}
        option = 'error'
        if(lock) option = option+' lock'
        message(msg, option, callback)
    }

    exports.spec = function(msg,lock){
        callback = typeof arguments[arguments.length-1]=='function' ? arguments[arguments.length-1] : function(){}
        option = 'spec'
        if(lock) option = option+' lock'
        message(msg, option, callback)
    }

    exports.fade = function(msg,lock){
        callback = typeof arguments[arguments.length-1]=='function' ? arguments[arguments.length-1] : function(){}
        option = 'fade'
        if(lock) option = option+' lock'
        message(msg, option, callback)
    }

})
