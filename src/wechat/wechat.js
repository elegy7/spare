var wx = window.wx
export function init(config, callback) {
    // http://res.wx.qq.com/open/js/jweixin-1.2.0.js
    callback = callback || function() {}
    var jsApiList = config['jsApiList'] || [
            'hideOptionMenu',
            'showOptionMenu',
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ],
        result = config['token']

    wx.config({
        debug: config['debug'], // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: result.appId, // 必填，公众号的唯一标识
        timestamp: result.timestamp, // 必填，生成签名的时间戳
        nonceStr: result.nonceStr, // 必填，生成签名的随机串
        signature: result.signature, // 必填，签名，见附录1
        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })

    wx.ready(function() {
        callback()
    })
}
export function initShare(config) {
    // 发送给好友
    wx.onMenuShareAppMessage({
        title: config['title'] || '',
        desc: config['desc'] || '',
        link: config['link'] || '',
        imgUrl: config['imgUrl'] || '',
        trigger: function(res) {
            var callback = config['trigger'] || function() {}
            callback()
        },
        success: function(res) {
            var callback = config['success'] || function() {}
            callback()
        },
        cancel: function(res) {
            var callback = config['cancel'] || function() {}
            callback()
        },
        fail: function(res) {
            var callback = config['fail'] || function() {}
            callback()
        }
    })
    // 分享到朋友圈
    wx.onMenuShareTimeline({
        title: config['desc'] || '',
        link: config['link'] || '',
        imgUrl: config['imgUrl'] || '',
        success: function(res) {
            var callback = config['success'] || function() {}
            callback()
        },
        cancel: function(res) {
            var callback = config['cancel'] || function() {}
            callback()
        }
    })
    // 分享到微博
    wx.onMenuShareWeibo({
        title: config['title'] || '',
        desc: config['desc'] || '',
        link: config['link'] || '',
        imgUrl: config['imgUrl'] || '',
        success: function(res) {
            var callback = config['success'] || function() {}
            callback()
        },
        cancel: function(res) {
            var callback = config['cancel'] || function() {}
            callback()
        }
    })
    // 分享到QQ
    wx.onMenuShareQQ({
        title: config['title'] || '',
        desc: config['desc'] || '',
        link: config['link'] || '',
        imgUrl: config['imgUrl'] || '',
        success: function(res) {
            var callback = config['success'] || function() {}
            callback()
        },
        cancel: function(res) {
            var callback = config['cancel'] || function() {}
            callback()
        }
    })
}
export default { init, initShare }
