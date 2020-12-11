const parse = function (params) {
    try {
        return JSON.parse(params)
    } catch (error) {
        return null
    }
}

const stringify = function (params) {
    try {
        return JSON.stringify(params)
    } catch (error) {
        return null
    }
}

export default function useLocalStorage() {
    function getItem(key) {
        let value = window.localStorage.getItem(key);
        if(value) value = parse(value)
        return value
    }
    function setItem(key,value) {
        value = stringify(value)
        if(value) window.localStorage.setItem(key,value)
    }
    return {
        getItem,
        setItem,
    }
}