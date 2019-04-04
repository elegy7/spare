export function sessionSave(module, key, value) {
    sessionStorage.setItem(
        module + '_' + key,
        JSON.stringify({
            data: value
        })
    )
}
export function sessionGet(module, key) {
    var obj = sessionStorage.getItem(module + '_' + key)
    try {
        obj = JSON.parse(obj)
        return obj.data
    } catch (err) {
        return null
    }
}
export function sessionRemove(module, key) {
    sessionStorage.removeItem(module + '_' + key)
}
export function localSave(module, key, value) {
    localStorage.setItem(
        module + '_' + key,
        JSON.stringify({
            data: value
        })
    )
}
export function localGet(module, key) {
    var obj = localStorage.getItem(module + '_' + key)
    if (!obj) {
        return null
    }
    try {
        obj = JSON.parse(obj)
        return obj.data
    } catch (err) {
        return null
    }
}
export function localRemove(module, key) {
    localStorage.removeItem(module + '_' + key)
}

export default {
    sessionSave,
    sessionGet,
    sessionRemove,
    localSave,
    localGet,
    localRemove
}
