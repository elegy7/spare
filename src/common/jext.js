define(function(require, exports, module){
    //将表单序列化为json对象
    $.fn.serJson = function(notNull){
        var serializeObj={}
        var array=this.serializeArray()
        var str=this.serialize()
        $(array).each(function(){
          if(serializeObj[this.name]){
              if($.isArray(serializeObj[this.name])){
                  serializeObj[this.name].push(this.value)
              }else{
                  serializeObj[this.name]=[serializeObj[this.name],this.value]
              }
          }else{
              serializeObj[this.name]=this.value 
          }
        })
        if(notNull){
          for(var key in serializeObj){
            if(serializeObj[key]==''){
                serializeObj[key] = undefined
            }
          }
        }
        return serializeObj
    }
    //将json赋值到表单
    $.fn.bindJson = function (data, func) {
      //循环赋值的过程中的执行函数
      var callback = func || function(){}
      for (var key in data) {
          var $dom = $('[name=' + key + ']', this)
          if($dom.length>0 && $dom.attr('type')!='file'){
            $dom.val(data[key]).trigger('change')
          }
      }
      return callback(key, this)
    }
    //iscroll创建方法
    $.fn.initScroll = function(conf){
        var $el = $(this)
        //初始化配置文件
        var config = $.extend(true, {
            down: function(){}
        },conf)

        //初始化元素高度
        $el.css('height', '100%')

        //如果元素内部没有iscroll容器则创建一个
        if($el.find('.iscroll-box').length==0){
            $el.wrapInner('<div class="iscroll-box"></div>')
        }
        $el.__proto__.iscroll = new IScroll($el[0])

        //iscroll暂停方法
        $el.__proto__.pauseScroll = function(){
            $('head').append('<style id="pause-iscroll" type="text/css">.pause-iscroll{'+this.attr('style').replace(/;/g,' !important;')+'}</style>')
            this.addClass('pause-iscroll')
        }

        //iscroll重启方法
        $el.__proto__.startScroll = function(){
            this.removeClass('pause-iscroll')
            $('#pause-iscroll').remove()
        }

        // 当滑动到底的时候执行回调函数, 回调函数可以在子组件里定义
        var maxY = 0, lock = false, iscroll = $el.iscroll

        // 滚动前先刷新, 判断页面高度是否改变, 改变了则解锁, 这样滚到到底部时会重新调用回调方法
        iscroll.on("scrollStart", function(){
            if(iscroll.maxScrollY == 0){
                $pages = $el.initScroll()
            }
            else{
                iscroll.refresh()
            }
            if(maxY != iscroll.maxScrollY){
                lock = false
            }
            maxY = iscroll.maxScrollY
        })
        iscroll.on("scrollEnd", function(){
            if(lock) return
            if(iscroll.maxScrollY == iscroll.y){
                config.down()
                lock = true
            }
        })
        return $el
    }

    //锚链接平滑滚动
    $("a.anchor").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        })
        return false
    })
})