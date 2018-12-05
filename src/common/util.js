import assignDeep from 'assign-deep'
var Util = {
    //获得地址栏传参的方法
    getRequest: function(l) {
        var location = l || window.location
        var url = location.search, //获取url中"?"符后的字串
            hash = location.hash
        var theRequest = new Object()
        if (url.indexOf('?') != -1) {
            var str = url.substr(1),
                strs = str.split('&')
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
            }
        }
        if (location.href.indexOf('#') != -1) {
            str = hash.substr(1)
            strs = str.split('#')
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
            }
        }
        return theRequest
    },
    //字符串转js对象
    strToObj: function(str) {
        if (typeof str == 'string') {
            if (str.charAt(0) != '{') {
                str = eval('"{"+str+"}"')
            }
            return eval('(' + str + ')')
        } else {
            return str
        }
    },
    //将对象序列化成问号传参
    query2str: function(params) {
        var str = '?'
        for (var key in params) {
            str += key + '=' + params[key] + '&'
        }
        return str
    },
    //复制对象
    clone: function(obj) {
        return this.extend(true, {}, obj)
    },
    extend: function() {
        var emptyObj = {}
        if (arguments[0] === true) {
            arguments[0] = emptyObj
            return assignDeep.call(...arguments)
        } else {
            return Object.assign(emptyObj, ...arguments)
        }
        return emptyObj
    },
    //获得元素相对位置
    getELMargin: function() {
        return {
            top: function(ele) {
                var scrollTop =
                    $(document).scrollTop() ||
                    $('body').scrollTop() ||
                    $('html').scrollTop()
                return $(ele).position().top - scrollTop
            },
            bottom: function(ele) {
                var actualBottom = document.body.offsetHeight - this.top(ele) //浏览器当前的高度减去当前元素的窗口位置，注意是相对的位置，不包括滚动条里的高度
                return actualBottom
            }
        }
    },
    whenScroll: function(conf) {
        //初始化参数
        var config = this.extend(
                {
                    getIn: function() {},
                    getOut: function() {}
                },
                conf
            ),
            //容器和容器高
            $el = $(config.el),
            el_height = $el.height()

        if ($el.length == 0) return

        $(window).on('scroll', function() {
            //获得容器顶部相对距离
            var el_top = this.getELMargin().top(config.el)
            if (el_top < -el_height || el_top > window.innerHeight) {
                config.getOut()
                $el.removeClass('when-pause')
            } else {
                //whenscroll-pause类名用于确保容进入容器中继续滚动时不反复执行getIn方法
                if ($el.hasClass('when-pause')) return
                config.getIn()
                $el.addClass('when-pause')
            }
        })
    },
    //创建定时方法前会先清除掉之前创建的, 只执行最后创建的
    timeout: function() {
        var temp = null
        return function(cb, t) {
            if (temp) {
                clearTimeout(temp)
            }
            temp = setTimeout(cb, t)
        }
    },
    //浏览器版本
    bower: function() {
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/
        var browser
        var version
        var ua = userAgent.toLowerCase()

        function uaMatch(ua) {
            var match = rMsie.exec(ua)
            if (match != null) {
                return {
                    browser: 'ie',
                    version: match[2] || '0'
                }
            }
            var match = rFirefox.exec(ua)
            if (match != null) {
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                }
            }
            var match = rOpera.exec(ua)
            if (match != null) {
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                }
            }
            var match = rChrome.exec(ua)
            if (match != null) {
                return {
                    browser: match[1] || '',
                    version: match[2] || '0'
                }
            }
            var match = rSafari.exec(ua)
            if (match != null) {
                return {
                    browser: match[2] || '',
                    version: match[1] || '0'
                }
            }
            if (match != null) {
                return {
                    browser: '',
                    version: '0'
                }
            }
        }
        var browserMatch = uaMatch(userAgent.toLowerCase())
        if (browserMatch.browser) {
            browser = browserMatch.browser
            version = browserMatch.version
        }
        var obj = {}
        obj[browser] = version
        return obj
    },
    store: {
        sessionSave: function(module, key, value) {
            sessionStorage.setItem(
                module + '_' + key,
                JSON.stringify({
                    data: value
                })
            )
        },
        sessionGet: function(module, key) {
            var obj = sessionStorage.getItem(module + '_' + key)
            try {
                obj = JSON.parse(obj)
                return obj.data
            } catch (err) {
                return null
            }
        },
        sessionRemove: function(module, key) {
            sessionStorage.removeItem(module + '_' + key)
        },
        localSave: function(module, key, value) {
            localStorage.setItem(
                module + '_' + key,
                JSON.stringify({
                    data: value
                })
            )
        },
        localGet: function(module, key) {
            var obj = localStorage.getItem(module + '_' + key)
            if (!obj) {
                return null
            }
            try {
                obj = JSON.parse(obj)
                return obj.data
            } catch (err) {
                return null
            }
        },
        localRemove: function(module, key) {
            localStorage.removeItem(module + '_' + key)
        }
    }
}

export var {
    getRequest,
    strToObj,
    query2str,
    extend,
    clone,
    getELMargin,
    whenScroll,
    timeout,
    bower,
    store
} = Util
