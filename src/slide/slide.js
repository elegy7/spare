define(function(require, exports,module){
    require('./slide.css')
    var config, lock = false, si = [], $el, $ul, $lis, $firstImg, $turnPrev, $turnNext, $tab, $title, $bar
    exports.init = function(conf){
        $el = $(conf.el), $ul = $el.find('ul'), $lis = $ul.find('li')
        $firstImg = $lis.find('img').first()

        var newImg = new Image()
        newImg.onload = function(){
            //设置基础值
            config = $.extend(true, {
                arrow: false,
                duration: 800,
                delay: 5000,
                radius: '100%',
                hideBar: 'auto',
                easing: 'swing',
                width: $firstImg.width(),
                height: $firstImg.height(),
                callback: function(){}
            },conf)

            //组件渲染
            render()
        }
        newImg.src = $firstImg.attr('src')
    }

    function render(){
        $el.addClass('still-slide').height(config.height).width(config.width)
        $ul.width(config.width * $lis.length).height(config.height)
        $lis.width(config.width)
        $lis.first().addClass('active')
        //设置按钮和箭头以及其事件
        $bar = $('<div class="slide-bar"></div>').appendTo($el)
        //标题栏
        $title = $('<p class="slide-title"></p>').html(function(){
            var href = $firstImg.closest('a').attr('href') || '#',
                title = $firstImg.attr('alt') || ''
            $('<a href="' + href + '">' + title + '</a>').appendTo(this)
        }).appendTo($bar)

        //tab栏
        $tab = $('<p class="slide-tab"></p>').html(function(){
            var self = this
            //加入按钮
            $lis.each(function(index,el){
                var cls = index == 0 ? 'active' : ''
                var radius = typeof config.radius == 'number' ? config.radius+'px' : config.radius
                $('<a class="' + cls + '" style="border-radius:' + radius + '"></a>').click(function(){
                    turn($(this).index())
                }).appendTo(self)
            })
        }).appendTo($bar)
        //tab栏的显示与隐藏
        if(config.hideBar=='auto'){
            $el.hover(function(){
                $bar.animate({bottom: 0})
            },function(){
                $bar.animate({bottom: -50})
            })
        }
        if(config.hideBar==false){
                $bar.css({bottom: 0})
        }
        if(config.hideBar==true){
                $bar.css({bottom: -50})
        }

        // 上一张
        $turnPrev = $('<a class="slide-prev slide-turn" title="上一张"><span>&lt;</span></a>').click(function(){
            var index = $ul.find('.active').prev().index()
            if(index == -1) {
                turn(-1, true)
                return
            }
            turn(index)
        }).appendTo($el)
        // 下一张
        $turnNext = $('<a class="slide-next slide-turn" title="下一张"><span>&gt;</span></a>').click(function(){
            var index = $ul.find('.active').next().index()
            if(index == -1) {
                turn($lis.length, true)
                return
            }
            turn(index)
        }).appendTo($el)


        //控制按钮和箭头的显示隐藏
        if(!config['arrow']){
            $('.slide-turn').hide()
        }

        //自动轮播
        autoPlay()
        $el.hover(function(){
            for(var key in si){
                clearInterval(si[key])   
            }
        },function(){
            autoPlay()
        })
        function autoPlay(){
            si.push(setInterval(function(){
                $turnNext.trigger('click')
            },config.delay))
        }
    }
    // 跳转指定页
    function turn(index, loop){
        if(lock) return

        if(!loop){
            $ul.stop().animate({left: config.width * index *-1}, config['duration'], config['easing'], function(){
                config.callback(index)
            })   
        }
        if(loop && index == $lis.length){
            lock = true
            $lis.first().clone().appendTo($ul.width(config.width * (index+1)))
            $ul.stop().animate({left: config.width * index *-1}, config['duration'], config['easing'], function(){
                config.callback(index)
                $ul.css({left: 0}).width(config.width * $lis.length).find('li:last').remove()
                lock = false
            })
            index = 0
        }
        if(loop && index == -1){
            lock = true
            $lis.last().clone().prependTo($ul.css({left: -config.width, width: config.width * ($lis.length+1)}))
            $ul.stop().animate({left: 0}, config['duration'], function(){
                config.callback(index)
                $ul.css({left: config.width * ($lis.length-1) * -1}).width(config.width * $lis.length).find('li:first').remove()
                lock = false
            })
            index = $lis.length-1
        }
        // 控制选中样式
        $('.slide-tab a').eq(index).addClass('active').siblings().removeClass('active')
        $lis.eq(index).addClass('active').siblings().removeClass('active')
        //更改标题栏内容
        var $li_active = $lis.eq(index),
            title = $li_active.find('img').attr('alt') || '', 
            href = $li_active.find('a').attr('href') || '#'
        $title.find('a').text(title).attr('href', href)
    }
    
})
