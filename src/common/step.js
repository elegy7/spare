export function sync(funcs) {
    var callback_str = ' '
    funcs.forEach(function(func, index) {
        callback_str = callback_str.replace(' ', 'funcs[' + index + '](function(){ })')
    })
    callback_str = callback_str.replace('function(){ }', '')
    /* eslint-disable */
    eval(callback_str)
    /* eslint-enable */
}
export function async(funcs, lastDone) {
    var doneTime = 0
    funcs.forEach(function(func) {
        func(function() {
            doneTime++
            if (doneTime === funcs.length) {
                lastDone()
            }
        })
    })
}
export default {
    sync,
    async
}
