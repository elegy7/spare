export default {
    bindJQ () {
        /*eslint-disable*/
        $.fn.initScroll = function (conf) {
            var $el = $(this)
            //初始化配置文件
            var config = $.extend(true, {
                down: function () {}
            }, conf)
        
            $el.__proto__.iscroll = new IScroll($el[0], config)
        
            //iscroll暂停方法
            $el.__proto__.pauseScroll = function () {
                var $this = this.find('.scroll-inner').first()
                $('head').append('<style id="pause-iscroll" type="text/css">.pause-iscroll{' + $this.attr('style').replace(/;/g, ' !important;') + '}</style>')
                $this.addClass('pause-iscroll')
            }
        
            //iscroll重启方法
            $el.__proto__.startScroll = function () {
                var $this = this.find('.scroll-inner').first()
                $this.removeClass('pause-iscroll')
                $('#pause-iscroll').remove()
            }
        
            // 当滑动到底的时候执行回调函数, 回调函数可以在子组件里定义
            var maxY = 0, lock = false, iscroll = $el.iscroll
        
            // 滚动前先刷新, 判断页面高度是否改变, 改变了则解锁, 这样滚到到底部时会重新调用回调方法
            iscroll.on("scrollStart", function () {
                if (iscroll.maxScrollY == 0) {
                    iscroll.refresh()
                    // $pages = $el.initScroll()
                }
                else {
                    iscroll.refresh()
                }
                if (maxY != iscroll.maxScrollY) {
                    lock = false
                }
                maxY = iscroll.maxScrollY
            })
            iscroll.on("scrollEnd", function () {
                if (lock) return
                if (iscroll.maxScrollY == iscroll.y) {
                    config.down()
                    lock = true
                }
            })
            return iscroll
        }
    },
    preventDefault (exclude) {
        //eg: ['TEXTAREA']
        exclude = exclude || []
        var overscroll = function (el) {
            el.addEventListener('touchstart', function () {
                var top = el.scrollTop,
                    totalScroll = el.scrollHeight,
                    currentScroll = top + el.offsetHeight
                if (top === 0) {
                    el.scrollTop = 1
                } else if (currentScroll === totalScroll) {
                    el.scrollTop = top - 1
                }
            })
            el.addEventListener('touchmove', function (evt) {
                if (el.offsetHeight < el.scrollHeight) evt._isScroller = true
            })
        }
        overscroll(document.querySelector('body'))//此处的scroll为需要禁止原生滚动的Object
        document.body.addEventListener('touchmove', function (evt) {
            if (!evt._isScroller && exclude.indexOf(evt.target.nodeName)==-1) {
                evt.preventDefault()
            }
        })
    }
}
