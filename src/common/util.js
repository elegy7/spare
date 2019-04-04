import assign from './assign'
// 获得地址栏传参的方法
export function getRequest(l) {
    var location = l || window.location
    var url = location.search, // 获取url中"?"符后的字串
        hash = location.hash
    var theRequest = {}
    if (url.indexOf('?') !== -1) {
        var str = url.substr(1),
            strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
    }
    if (location.href.indexOf('#') !== -1) {
        str = hash.substr(1)
        strs = str.split('#')
        for (i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
    }
    return theRequest
}
// 将对象序列化成问号传参
export function query2str(params) {
    var str = '?'
    for (var key in params) {
        str += key + '=' + params[key] + '&'
    }
    return str
}
// 复制对象
export function clone(source) {
    let target = {}
    if (source instanceof Array) {
        target = []
    }
    if (source instanceof Function) {
        target = function() {}
    }
    assign.extend(true, target, source)
    return target
}
// 创建定时方法前会先清除掉之前创建的, 只执行最后创建的
export function timeout() {
    var temp = null
    return function(cb, t) {
        if (temp) {
            clearTimeout(temp)
        }
        temp = setTimeout(cb, t)
    }
}
// 浏览器版本
export function bower() {
    var userAgent = navigator.userAgent,
        rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
        rFirefox = /(firefox)\/([\w.]+)/,
        rOpera = /(opera).+version\/([\w.]+)/,
        rChrome = /(chrome)\/([\w.]+)/,
        rSafari = /version\/([\w.]+).*(safari)/
    var browser
    var version

    function uaMatch(ua) {
        var match = rMsie.exec(ua)
        if (match != null) {
            return {
                browser: 'ie',
                version: match[2] || '0'
            }
        }
        match = rFirefox.exec(ua)
        if (match != null) {
            return {
                browser: match[1] || '',
                version: match[2] || '0'
            }
        }
        match = rOpera.exec(ua)
        if (match != null) {
            return {
                browser: match[1] || '',
                version: match[2] || '0'
            }
        }
        match = rChrome.exec(ua)
        if (match != null) {
            return {
                browser: match[1] || '',
                version: match[2] || '0'
            }
        }
        match = rSafari.exec(ua)
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
}

export default {
    getRequest,
    query2str,
    clone,
    timeout,
    bower
}
