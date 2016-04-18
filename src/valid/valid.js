define(function (require, exports, module) {
    require('common/util')
    require('valid/valid.css')
    var asyncRules = {}, __doValidNow = false

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
                var passOne = $(this).closest('form').find('[name='+param+']')[0]
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
        }
    }
    //错误提示方法
    exports.showTip = function($input, $tip){
        var position = $input.position()
        var offsetWidth = $input.outerWidth()
        var offsetHeight = $input.outerHeight()
        var offsetHeightTip = $tip.outerHeight()
        $tip.css('top', position['top'] + (offsetHeight - offsetHeightTip) / 2)
        $tip.css('left', position['left'] + offsetWidth + 25)
    }
    //给表单绑定验证
    $.fn.bindValid = function(config){
        config = config || {}
        config.evt = typeof config.evt !='undefined' && config.evt!=null ? config.evt : 'change'
        var conf = {
            evt: config.evt ? config.evt+' eValid' : 'keyup change focus eValid',
            ver: config.ver
        }
        //需要验证的input框
        var $vaild = $(this).find('.ee-validbox')
        //初始化验证提示tip
        var vHeight = $vaild[0].clientHeight
        var $invalid = $('<div class="ee-invalid-tip"><div class="tip-arrow"></div><div class="tip-content"></div></div>')

        //定义匹配验证规则并执行验证的方法
        var doValid = function(rules, options, $this, $invalid, async){
            //这个字段为了判断是否通过本地验证,如果未通过,则不进行异步验证
            var inRule = false
            for(var i in options.validType){
                //根据自定义验证的名称去匹配验证规则里的验证方法
                var rule = still.Util.clone(rules[options.validType[i].split('[')[0]])  //ver1.3的bug修复
                //获得自定义验证的参数
                var param = options.validType[i].split('[')[1] ? options.validType[i].split('[')[1].split(']')[0].split(',') : ''
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
                        $invalid.find('.tip-content').text(rule.message) 
                        $this.after($invalid) 
                        exports.showTip($this,$invalid)
                        break           
                    }
                }
            }
            return inRule
        }
        //绑定input框的 keyup 和 change事件
        var loopValid
        $vaild.off(conf.evt).on(conf.evt,function(e){
            if(loopValid)clearTimeout(loopValid)
            var $this = $(this)
            //获得验证配置的字符串并将他转换成对象
            var options = $this.data('options')
            options = still.Util.strToObj(options)
            //重新触发事件时先移除错误提示
            $this.find('+.ee-invalid-tip').remove()
            $this.removeClass('ee-invalid')
            if(options['required'] && $this.val()==''){
                //判断否未为空
                $this.addClass('ee-invalid')
                $invalid.find('.tip-content').text('请将信息填写完整')
                $this.after($invalid)           
                if(e.type != 'change') exports.showTip($this,$invalid)
            }else{
                //如果不为空,则进入自定义验证阶段
                if(typeof options.validType == 'string'){
                    //因为支持多个自定义验证, 如果只有一个则先将其放入数组
                    options.validType = [options.validType]
                }
                //遍历Rules数组里的所有自定义验证
                var inRule = doValid.call(this, exports.rules, options, $this, $invalid, false)
                //如果不在本地验证规则里,则在异步验证规则里判断
                if(!inRule && e['type']!='change'){
                    if(__doValidNow){
                        //进行异步验证的立即执行模式
                        //遍历asyncRules数组里的所有自定义验证
                        doValid.call(this, asyncRules, options, $this, $invalid)
                        __doValidNow = false
                    }else{
                        loopValid = setTimeout(function(){
                            //遍历asyncRules数组里的所有自定义验证
                            doValid.call(this, asyncRules, options, $this, $invalid)
                        },700)
                    }
                }
            }
        })
    }
    //检查表单验证
    $.fn.fireValid = function(){
        //if $('.ee-invalid').length > 0
        //return
        $('.ee-invalid').removeClass('ee-invalid')
        var end = false
        //开启异步验证的立即执行模式
        __doValidNow = true
        $('.ee-validbox', this).each(function(index, el){
            if(!end){
                $(el).trigger('eValid')
                hasError = $(el).hasClass('ee-invalid')
                if(hasError) end = true
            }
        })
        return end ? false : true
    }

})