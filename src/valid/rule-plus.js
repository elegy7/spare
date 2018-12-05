export default {
    size: {
        validator: function (value, param) {
            if (value == '') return true
            return value.length == param[0]
        },
        message: '长度必须为{0}位'
    },
    sizes: {
        validator: function (value, param) {
            if (value == '') return true
            return value.length == param[0] || value.length == param[1]
        },
        message: '长度必须为{0}位或{1}位'
    },
    min: {
        validator: function (value, param) {
            if (value == '') return true
            return parseFloat(value) >= param[0]
        },
        message: '数值必须都不小于{0}'
    },
    max: {
        validator: function (value, param) {
            if (value == '') return true
            return parseFloat(value) <= param[0]
        },
        message: '数值必须都不大于{0}'
    },
    minout: {
        validator: function (value, param) {
            if (value == '') return true
            return parseFloat(value) > param[0]
        },
        message: '数值必须都大于{0}'
    },
    maxout: {
        validator: function (value, param) {
            if (value == '') return true
            return parseFloat(value) < param[0]
        },
        message: '数值必须都小于{0}'
    },
    letter: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /^[0-9a-zA-Z]*$/g
            return reg.test(value)
        },
        message: '只能输入数字或字母'
    },
    bankCard: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /^[0-9]*$/g
            return reg.test(value)
        },
        message: '请输入正确的卡号，只能是数字'
    },
    mobile: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /^1([\d]{10})$/
            return reg.test(value)
        },
        message: '请输入11位手机号码'
    },
    name: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /^[\u4E00-\u9FA5A-Za-z]{2,50}$/
            return reg.test(value)
        },
        message: '只能输入中文或英文'
    },
    fox: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /\+?\d{3,4}-\d{6,}/
            return reg.test(value)
        },
        message: '请输入正确的传真号码'
    },
    QQ: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /[1-9][0-9]{4,}/
            return reg.test(value)
        },
        message: 'QQ号码只能是四位以上纯数字'
    },
    /*不能为0*/
    withoutZero: {
        validator: function (value, param) {
            if (value == '') return true
            return value != 0
        },
        message: '不能为0'
    },
    /*可以输入括号和减号*/
    parentheses: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /[`~!@# $%^&*+<>?:"{},.\/;'[\]]/im
            return !reg.test(value)
        },
        message: '只允许数字和英文字母,-和()'
    },
    HKcard: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}((\([0-9aA]\))|([0-9aA]))$/
            return reg.test(value)
        },
        message: '香港身份证号的格式为 A123456(7) ，请正确输入'
    },
    TWcard: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /^[A-KM-QT-XZa-km-qt-xz]{1}[0-9]{9}$/
            return reg.test(value)
        },
        message: '台湾身份证号的格式为 A123456789 ，请正确输入'
    },
    MOcard: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /^[1|5|7][0-9]{6}\([0-9Aa]\)$/
            return reg.test(value)
        },
        message: '澳门身份证号的格式为 1234567(8) ，请正确输入'
    },
    /*非中文*/
    nonChinese: {
        validator: function (value, param) {
            if (value == '')return true
            var reg = /[\u4e00-\u9fa5]/
            return !reg.test(value)
        },
        message: '密码只能由英文、数字、特殊字符组成'
    },
    money: {
        validator: function (value, param) {
            if (value == '')return true
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            return reg.test(value)
        },
        message: '请输入正确的金钱格式！'
    },
    post: {
        validator: function (value, param) {
            if (value == '')return true
            var reg = /(^\d{6}$)/
            return reg.test(value)
        },
        message: '请输入正确的邮编！'
    },
    // 座机
    telephone: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /\+?\d{3,4}-\d{6,}/
            return reg.test(value)
        },
        message: '请输入正确的座机号码'
    },
    // 只能是中文
    chinese: {
        validator: function (value, param) {
            if (value == '')return true
            var reg = /[\u4e00-\u9fa5]/
            return reg.test(value)
        },
        message: '只能是中文组成'
    },
    intNum: {
        validator: function (value, param) {
            if (value == '')return true
            var reg = /^[+]?\d+(\.\d+)?$/
            return reg.test(value)
        },
        message: '只能输入正数'
    },
    price: {
        validator: function (value, param) {
            if (value == '') return true
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]([0-9])?)?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/g
            return reg.test(value)
        },
        message: '请输入正确的数字格式,保留两位小数'
    },
    dateMoreThanNow: {
        validator: function (value, param) {
            if (value == '') return true
            return (new Date().getTime() - new Date(value).getTime()) < 0 // 86450000
        },
        message: '必须大于当前时间'
    },
    lengthLessThan: {
        validator: function (value, param) {
            if (value == '') return true
            return value.length <= param[0]
        },
        message: '长度不能大于{0}位'
    }
}