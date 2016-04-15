//页面分屏插件 By:Adrai 2014-09-22
define(function(require, exports, module){
	var ieSupport = require('common/ie.js');
					require('common/mousewhell.js');
					require('pagex/pagex.css');
	var isWait = false, nowIndex = 1, targetIndex, areaId, areaChild, speed, afterScroll, afterRender, enable;
	
	var browser = ieSupport.IeVesion();
	exports.render = function(args){
		areaId		= args['areaId'];
		areaChild	= args['areaChild'];
		speed		= args['speed']<1 ? args['speed'] : args['speed']/1000;
		afterScroll	= args['afterScroll'] || function(){};
		enable		= args["enable"]!=false ? true : false
		//初始化页面准备
		initNav(args);
		//绑定滚动事件
		if(enable) bindScroll();
		afterRender = args['afterRender'] || function(){};
		return afterRender();
	}
	function initNav(args){
		//给右侧添加导航栏
		if(args['nav']){
			$(areaId).append('<ul class="pagex-nav right" id="pagexNav"></ul>');
			$("#pagexNav").delegate('li','click',function(){
				//获取点击的目标页面的index
				targetIndex = $(this).data('index');
				if(targetIndex<nowIndex){
					pageScroll(targetIndex,nowIndex);
				}else if(targetIndex>nowIndex){
					pageScroll(targetIndex,nowIndex);
				}else{
					return afterScroll(nowIndex);
				}
			});
		}
		//给每个子页面添加样式和标识
		var	length = $(areaId+'>'+areaChild).length;
		$(areaId+'>'+areaChild).each(function(i,dom){
			$(dom).css('z-index',length);
			$(dom).addClass('pagex'+(i+1));
			$(dom).css('position','absolute');
    		$(dom).css('transition-duration',speed+'s');
    		$(dom).css('transition-property','transform');
			length--;
			if(args['nav']){
				$('#pagexNav').append('<li data-index='+(i+1)+'></li>');
			}
		});
		$('li',"#pagexNav").eq(0).addClass('selected');
	}
	function bindScroll(){
		var	isWait = false;
		$(areaId).mousewheel(function(e,detail) {
	        if(detail<0){
	        	if(nowIndex==$(areaId+'>'+areaChild).length)return false;
	        	pageScroll(nowIndex+1, nowIndex);
	        }else{
	   			if(nowIndex==1)return false;
	        	pageScroll(nowIndex-1, nowIndex);
	        }
	    });
    }
    function pageScroll(tIndex,nIndex){
    	if(waitEvent())return false;
    	$('li','#pagexNav').removeClass('selected');
		$('li','#pagexNav').eq(tIndex-1).addClass('selected');
		var d = beforePageScroll(tIndex,nIndex);
    	if(tIndex>nIndex){
	    	var $thisPage = $('.pagex'+nIndex);
	    	var _height = $thisPage[0].scrollHeight;
	    	if(browser['ie'] && browser['ie']<10){
				$thisPage.animate({'top':-_height}, speed*1000);
	    	}else{
	    		$thisPage.css('transform','translateY(-'+_height+'px)');	
	    	}
			nowIndex = tIndex;
	    	return afterScroll(nowIndex);
    	}else if(tIndex<nIndex){
	    	var $thisPage = $('.pagex'+(tIndex));
	    	if(!$thisPage[0])return false;
	    	var _height = $thisPage[0].scrollHeight;
	    	if(browser['ie'] && browser['ie']<10){
				$thisPage.animate({'top':0}, speed*1000);
	    	}else{
	    		$thisPage.css('transform','translateY(0px)');
	    	}
			nowIndex = tIndex;
	    	return afterScroll(nowIndex);
    	}else{
    		return false;
    	}
    }
    function beforePageScroll(tIndex, nIndex){
  	  	var _height,_between = tIndex-nIndex;
    	if(_between==1 || _between==-1 || _between==0){
    		return false;
    	}else if(_between>1){
			for(i = nIndex+1;i<tIndex;i++){
				$thisPage = $('.pagex'+i);
		    	_height = $thisPage[0].scrollHeight;
		    	if(browser['ie'] && browser['ie']<10){
					$thisPage.css('top',-_height+'px');
				}else{
		    		$thisPage.css('transform','translateY(-'+_height+'px)');
				}
			}
			return 'up';
    	}else if(_between<-1){
			for(i = nIndex-1;i>tIndex;i--){
				$thisPage = $('.pagex'+(i));
				if(browser['ie'] && browser['ie']<10){
					$thisPage.css('top','0px').hide();
				}else{
					$thisPage.css('transform','translateY(0px)').hide();
				}
			}
			//当页面从后往前翻时,先暂时隐藏中间页面, 动画完成后再设置可见
			setTimeout(function(){
				$(areaChild).siblings().show();
			},speed*1000);
			return 'down';
    	}
    }
   	//事件暂停方法
    function waitEvent(){
		if(isWait)return true;
		isWait = true;
		setTimeout(function(){
			isWait = false;
		},speed*1000);
		return false;
    }
});

