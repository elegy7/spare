define(function (require, exports, module) {
    var Util = require('common/util')
    require('valid/valid.css')
    
    // 扩展String对象
    String.prototype.trim = function(){
        return this.replace(/(^\s*)|(\s*$)/g, "")
    }
    //立即验证模式
    var __doValidNow = false

    exports.asyncRules = {}

    exports.rules = {
        email:{
            validator: function(value, param){
                if(value=='')return true
                var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                return reg.test(value)
            },
            message: '邮箱格式不正确'
        },
        length:{
            validator:function(value,param){
                if(value=='')return true
                return value.length>=param[0] && value.length<=param[1]
            },
            message: '长度必须在{0}到{1}位之间'
        },
        min:{
            validator:function(value,param){
                if(value=='')return true
                return value>=param[0]
            },
            message: '数值必须都不小于{0}'
        },
        max:{
            validator:function(value,param){
                if(value=='')return true
                return value<=param[0]
            },
            message: '数值必须都不大于{0}'
        },
        between:{
            validator:function(value,param){
                if(value=='')return true
                return value>=param[0] && value<=param[1]
            },
            message: '数值必须在{0}到{1}位之间'
        },
        passEQ:{
            validator: function(value, param){
                if(value=='')return true
                var passOne = $(this).closest('form').find('[name='+param[0]+']')[0]
                return $(passOne).val()==value
            },
            message: '两次密码输入必须一致'
        },
        int:{
            validator: function(value, param){
                if(value == '')return true
                var reg = /^\d+$/
                return reg.test(value)
            },
            message: '只能输入整数'
        },
        num:{
            validator: function(value, param){
                if(value == '')return true
                var reg = /^[+-]?\d+(\.\d+)?$/
                return reg.test(value)
            },
            message: '只能输入数字'
        },
        tel:{
            validator: function(value, param){
                if(value == '')return true
                var reg = /^(\({0,1}\d{3,4})\){0,1}(-){0,1}(\d{7,8})$/
                return reg.test(value)
            },
            message: '数据不合法,必须是手机或电话,座机带区号'
        },
        phone:{
          validator: function(value, param){
                if(value == '')return true
                var reg = /^1[3|4|5|8][0-9]\d{4,8}$/
                return reg.test(value)
            },
          message: '请填写正确的手机号码'
        },
        username:{
            validator: function(value, param){
                if(value == '')return true
                var reg = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im
                return !reg.test(value)
            },
            message: '用户名不能含有特殊字符'
        },
        card:{
            validator: function(value, param){
                if(value == '')return true
                var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
                return reg.test(value)
            },
            message: '身份证号只能为15位或18位'
        }
    }
    //错误提示方法
    exports.showTip = function($input, $tip){}
    //移除错误提示
    exports.removeTip = function($input){}
    //给表单绑定验证
    $.fn.bindValid = function(config){
        config = config || {}
        var conf = {
            evt: config.evt ? config.evt+' eValid' : 'keyup change eValid',
            ver: config.ver
        }
        //清空之前的事件和样式
        $(this).off(conf.evt)
        $('.ee-invalid-tip').remove()
        $('.ee-invalid').removeClass('ee-invalid')
        //需要验证的input框
        var $vaild = $(this).find('[data-valid]')
        //初始化验证提示tip
        var vHeight = $vaild[0].clientHeight
        var $invalid = $('<div class="ee-invalid-tip"></div>')

        //定义匹配验证规则并执行验证的方法
        var doValid = function(rules, options, $this, $invalid, async){
            //这个字段为了判断是否通过本地验证,如果未通过,则不进行异步验证
            var inRule = false
            for(var i in options){
                //根据自定义验证的名称去匹配验证规则里的验证方法
                var rule = Util.clone(rules[options[i].split('(')[0]])  //ver1.3的bug修复
                //获得自定义验证的参数
                var param = options[i].split('(')[1] ? options[i].split('(')[1].split(')')[0].split(',') : ''
                //如果在验证规则里匹配到了,则进行验证
                if(rule){
                    //调用验证规则里的方法,并将this指向到input框
                    var bool = rule.validator.call($this,$this.val(),param)
                    if(!bool){
                        if(async == false){
                            inRule = true
                        }
                        //如果验证未通过, 则提示,并终止循环
                        for(var i in param){
                            rule.message = rule.message.replace('{'+i+'}',param[i])
                        }
                        $this.addClass('ee-invalid')
                        $invalid.text(rule.message)
                        $this.after($invalid) 
                        exports.showTip($this,$invalid)
                        break           
                    }
                }
            }
            return inRule
        }
        //绑定input框的 keyup 和 change事件
        var util_timeout = Util.timeout()
        $vaild.on(conf.evt,function(e){
            var $this = $(this),
            timeout = __doValidNow ? function(cb){cb()} : util_timeout
            timeout(function(){
                //获得验证配置的字符串并将他转换成对象
                var options = eval( $this.data('valid') )
                //重新触发事件时先移除错误提示
                exports.removeTip($this)
                $this.next('.ee-invalid-tip').remove()
                $this.removeClass('ee-invalid')
                //得到"不为空"这条规则的所在位置
                var requiredIndex = options.indexOf('required'),
                    inputVal = typeof $this.val() == 'string' ? $this.val().trim() : $this.val()
                if(requiredIndex!=-1 && $.isEmptyObject(inputVal)){
                    //判断否未为空
                    $this.addClass('ee-invalid')
                    $invalid.text('请将信息填写完整')
                    $this.after($invalid)
                    exports.showTip($this,$invalid)
                }else{
                    //如果不为空,则进入自定义验证阶段
                    if(requiredIndex != -1 ) options.splice(requiredIndex,1)
                    //遍历Rules数组里的所有自定义验证
                    var inRule = doValid.call(this, exports.rules, options, $this, $invalid, false)
                    //如果不在本地验证规则里,则在异步验证规则里判断
                    if(!inRule && e['type']!='change'){
                        doValid.call(this, exports.asyncRules, options, $this, $invalid)
                    }
                }
            },500)
        })
    }
    //检查表单验证
    $.fn.fireValid = function($input){
        //if $('.ee-invalid').length > 0
        //return
        $('.ee-invalid').removeClass('ee-invalid')
        $('.ee-invalid').each(function(el){
            exports.removeTip($(el))
        })
        var end = false
        //开启异步验证的立即执行模式
        __doValidNow = true
        if($input){
            $input.trigger('eValid')
            var hasError = $input.hasClass('ee-invalid')
            if(hasError) end = true
        }else{
            $('[data-valid]', this).each(function(index, el){
                $(el).trigger('eValid')
                var hasError = $(el).hasClass('ee-invalid')
                if(hasError) end = true
            })
        }
        __doValidNow = false
        return end ? false : true
    }

})