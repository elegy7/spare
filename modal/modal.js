import './modal.less'

function makeModal(config) {
    if ($('.spare-modal').length == 0) {
        var $modal = $(
            `<div :id="id" class="spare-modal modal fade" tabindex="-1" data-width="560" data-backdrop="static">`+
                `<div class="modal-dialog">`+
                    `<div class="modal-content">`+
                        `<div class="modal-header">`+
                            `<h4 class="modal-title">${config.title}</h4>`+
                        `</div>`+
                        `<div class="modal-body">`+
                            `<div class="callout">`+
                                `${config.context}`+
                            `</div>`+
                        `</div>` +
                        `<div class="modal-footer">`+
                            `<button type="button" data-dismiss="modal" class="btn btn-sm btn-min btn-default pull-left btn-cancel">取消</button>`+
                            `<button type="button" class="btn btn-sm btn-min btn-success btn-ok">确定</button>`+
                        `</div>`+
                    `</div>`+
                `</div>`+
            `</div>`).appendTo('body')
    } else {
        $('.spare-modal .callout').text(config.context)
    }
    $('.spare-modal .btn-ok').off('click').on('click', function () {
        config.callback && config.callback()
        $('.spare-modal').remove()
    })
    $('.spare-modal .btn-cancel').off('click').on('click', function () {
        $('.spare-modal').remove()
    })

    return $modal
}
export default {
    confirm: function (context, title, callback) {
        var $modal = makeModal({
            context,
            title,
            callback
        })
        $modal.show().animate({'opacity': 1}, 300)
    },
    show: function (context, title, callback) {
        var $modal = makeModal({
            context,
            title,
            callback
        })
        $modal.show().animate({'opacity': 1}, 300)
    }
}
