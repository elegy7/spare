import './valid.css'
import * as Util from '../common/util'
// 扩展String对象
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
}
//立即验证模式
var __doValidNow = false
export default {
    asyncRules: {},
    rules: {
        email: {
            validator: function (value, param) {
                if (value == '') return true
                var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                return reg.test(value)
            },
            message: '邮箱格式不正确'
        },
        length: {
            validator: function (value, param) {
                if (value == '') return true
                return value.length >= param[0] && value.length <= param[1]
            },
            message: '长度必须在{0}到{1}位之间'
        },
        between: {
            validator: function (value, param) {
                if (value == '') return true
                return value >= param[0] && value <= param[1]
            },
            message: '数值必须在{0}到{1}位之间'
        },
        passEQ: {
            validator: function (value, param) {
                if (value == '') return true
                var passOne = $(this).closest('form').find('[type="password"]')[param[0]]
                return $(passOne).val() == value
            },
            message: '两次密码输入必须一致'
        },
        int: {
            validator: function (value, param) {
                if (value == '') return true
                var reg = /^\d+$/
                return reg.test(value)
            },
            message: '只能输入正整数'
        },
        num: {
            validator: function (value, param) {
                if (value == '') return true
                var reg = /^[+-]?\d+(\.\d+)?$/
                return reg.test(value)
            },
            message: '只能输入数字'
        },
        tel: {
            validator: function (value, param) {
                if (value == '') return true
                var reg = /^(\({0,1}\d{3,4})\){0,1}(-){0,1}(\d{7,8})$/
                return reg.test(value)
            },
            message: '数据不合法,必须是手机或电话,座机带区号'
        },
        phone: {
            validator: function (value, param) {
                if (value == '') return true
                var reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                return reg.test(value)
            },
            message: '请填写正确的11位手机号码'
        },
        base: {
            validator: function (value, param) {
                if (value == '') return true
                var reg = /[`~!@# $%^&*()+<>?:"{},.\/;'[\]]/im
                return !reg.test(value)
            },
            message: '不能含有特殊字符'
        },
        card: {
            validator: function (value, param) {
                if (value == '') return true
                var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
                return reg.test(value)
            },
            message: '身份证号只能为15位或18位'
        }
    },
    //错误提示方法
    showTip: function ($input, $tip) {},
    //移除错误提示
    removeTip: function ($input) {},
    //初始化
    init: function (exports) {
        var exports = this
        //给表单绑定验证
        $.fn.bindValid = function (config) {
            config = config || {}
            var conf = {
                    evt: config.evt ? config.evt + ' eValid' : 'keyup change eValid',
                    ver: config.ver
                },
                $this = $(this)
            //清空之前的事件和样式
            $this.off(conf.evt)
            $('.ee-invalid-tip').remove()
            $('.ee-invalid').removeClass('ee-invalid')
            //需要验证的input框
            var $valid = $this.attr('data-valid') ? $this : $this.find('[data-valid]')
            if (!$valid.length) return
            //初始化验证提示tip
            var $invalid = $('<div class="ee-invalid-tip"></div>')

            //定义匹配验证规则并执行验证的方法
            var doValid = function (rules, options, $this, $invalid, async) {
                //这个字段为了判断是否通过本地验证,如果未通过,则不进行异步验证
                var inRule = false
                for (var i in options) {
                    //根据自定义验证的名称去匹配验证规则里的验证方法
                    var rule = Util.clone(rules[options[i].split('(')[0]])
                    //获得自定义验证的参数
                    var param = options[i].split('(')[1] ? options[i].split('(')[1].split(')')[0].split(',') : ''
                    //如果在验证规则里匹配到了,则进行验证
                    if (rule) {
                        //调用验证规则里的方法,并将this指向到input框
                        var bool = rule.validator.call($this, $this.val(), param)
                        if (!bool) {
                            if (async == false) {
                                inRule = true
                            }
                            //如果验证未通过, 则提示,并终止循环
                            for (var i in param) {
                                rule.message = rule.message.replace('{' + i + '}', param[i])
                            }
                            $this.addClass('ee-invalid')
                            $invalid.text(rule.message)
                            $this.after($invalid)
                            exports.showTip($this, $invalid)
                            break
                        }
                    }
                }
                return inRule
            }
            //绑定input框的 keyup 和 change事件
            var util_timeout = Util.timeout()
            $valid.on(conf.evt, function (e) {
                var $this = $(this),
                    timeout = __doValidNow ? function (cb) {
                        cb()
                    } : util_timeout
                timeout(function () {
                    //获得验证配置的字符串并将他转换成对象
                    var options = JSON.parse($this.attr('data-valid').replace(/\'/g, '"'))
                    //重新触发事件时先移除错误提示
                    exports.removeTip($this)
                    $this.next('.ee-invalid-tip').remove()
                    $this.removeClass('ee-invalid')
                    //得到"不为空"这条规则的所在位置
                    var requiredIndex = options.indexOf('required'),
                        dataVal = $this.attr('data-val'),
                        inputVal = typeof dataVal != 'undefined' ? dataVal : typeof $this.val() == 'string' ? $this.val().trim() : $this.val()
                    if (requiredIndex != -1 && ($.isEmptyObject(inputVal) || inputVal == '0.00') && ['keyup', 'eValid'].indexOf(e.type) != -1) {
                        // if(requiredIndex!=-1 && $.isEmptyObject(inputVal)){
                        //判断否未为空
                        $this.addClass('ee-invalid')
                        if ($this.data('label')) {
                            $invalid.text($this.data('label') + '不能为空')
                        } else {
                            $invalid.text('请将信息填写完整')
                        }
                        $this.after($invalid)
                        exports.showTip($this, $invalid)
                    } else {
                        //如果不为空,则进入自定义验证阶段
                        if (requiredIndex != -1) options.splice(requiredIndex, 1)
                        //遍历Rules数组里的所有自定义验证
                        var inRule = doValid.call(this, exports.rules, options, $this, $invalid, false)
                        //如果不在本地验证规则里,则在异步验证规则里判断
                        if (!inRule && e['type'] != 'change') {
                            doValid.call(this, exports.asyncRules, options, $this, $invalid)
                        }
                    }
                }, 500)
            })
            return this
        }
        //检查表单验证
        $.fn.fireValid = function (isInput, visibleIgnore) {
            //if $('.ee-invalid').length > 0
            //return
            this.clearValid(isInput)
            var end = false
            //开启异步验证的立即执行模式
            __doValidNow = true
            if (isInput) {
                this.trigger('eValid')
                var hasError = this.hasClass('ee-invalid')
                if (hasError) end = true
            } else {
                $('[data-valid]', this).each(function (index, el) {
                    if ($(el).is(':visible') || visibleIgnore) {
                        $(el).trigger('eValid')
                        var hasError = $(el).hasClass('ee-invalid')
                        if (hasError) end = true
                    }
                })
            }
            __doValidNow = false
            return end ? false : true
        }
        $.fn.clearValid = function (isInput) {
            if (isInput) {
                exports.removeTip($(this))
                this.removeClass('ee-invalid')
                this.siblings('.ee-invalid-tip').remove()
            } else {
                this.find('.ee-invalid').each(function (el) {
                    exports.removeTip($(el))
                })
                this.find('.ee-invalid').removeClass('ee-invalid')
                this.find('.ee-invalid-tip').remove()
            }
            return this
        }
    }
}
/* export var {
    asyncRules,
    rules,
    showTip,
    removeTip,
    init
} = Valid */