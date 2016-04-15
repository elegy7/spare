define(function(require, exports, module){
    require('message/remodal.css')
    require('message/remodal.js')
    exports.confirm = function(msg, callback){
        callback = callback || function(){}
        var remodal = makeModal(msg, callback,'')
        $('.remodal-cancel').show()
        remodal.open()
    }
    exports.show = function(msg, callback){
        callback = callback || function(){}
        var remodal = makeModal(msg, callback,'')
        $('.remodal-cancel').hide()
        remodal.open()        
    }
   function makeModal(msg, callback, title){
        if($('.remodal').length==0){
            $('body').append(
                '<div class="remodal" data-remodal-id="modal" role="dialog" aria-labelledby="modal1Title" aria-describedby="modal1Desc">'+
                    '<button data-remodal-action="close" class="remodal-close" aria-label="Close"></button>'+
                    '<div>'+
                        "<h2 id='modal1Title'>" + title + "</h2>"+
                        "<p id='modal1Desc' style='font-size:14px;'>" + msg + "</p>"+
                    '</div>'+
                    '<br>'+
                    '<button data-remodal-action="confirm" class="remodal-confirm">确定</button>'+
                    '<button data-remodal-action="cancel" class="remodal-cancel">取消</button>'+
                '</div>')
        }
        else{
            $('#modal1Desc').text(msg)
        }
        $('.remodal button').off('click').on('click',function(){
            if($(this).hasClass('remodal-confirm')) callback()
        })

        return $('.remodal').remodal()
    }
})