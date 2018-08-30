export default {
    sync: function (funcs) {
        var callback_str = ' '
        funcs.forEach(function (func, index) {
            callback_str = callback_str.replace(' ', 'funcs[' + index + '](function(){ })')
        })
        callback_str = callback_str.replace('function(){ }', '')
        eval(callback_str)
    },
    async: function (funcs, lastDone) {
        var doneTime = 0
        funcs.forEach(function (func) {
            func(function () {
                doneTime++
                if (doneTime == funcs.length) {
                    lastDone()
                }
            })
        })
    }
}
