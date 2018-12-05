;
(function () {
    $.fn.serJson = function (notNull) {
        var serializeObj = {}
        var array = this.serializeArray()
        var str = this.serialize()
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value)
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value]
                }
            } else {
                serializeObj[this.name] = this.value
            }
        })
        if (notNull) {
            for (var key in serializeObj) {
                if (serializeObj[key] == '') {
                    serializeObj[key] = undefined
                }
            }
        }
        return serializeObj
    }
    //将json赋值到表单
    $.fn.bindJson = function (data, func) {
        //循环赋值的过程中的执行函数
        var callback = func || function () {}
        for (var key in data) {
            var $dom = $('[name=' + key + ']', this)
            if ($dom.length > 0 && $dom.attr('type') != 'file') {
                $dom.val(data[key]).trigger('change')
            }
        }
        return callback(key, this)
    }

    //锚链接平滑滚动
    /* $("a.anchor").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        })
        return false
    }) */
})()
