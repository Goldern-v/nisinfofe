export default {
    setLocalStorageItem(key,value){
        value = JSON.stringify(value);
        window.localStorage.setItem(key,value);
    },
    getLocalStorageItem(key,defaultValue){
        let value = window.localStorage.getItem(key)
        try {
            value = JSON.parse(value);
        } catch (error) {
            console.log(error)
        }
        return value || defaultValue;
    },
    removeLocalStorageItem(key){
        window.localStorage.removeItem(key)
    },
    clearLocalStorage(){
        window.localStorage.clear();
    },
    setSessionStorageItem(key,value){
        value = JSON.stringify(value);
        window.sessionStorage.setItem(key,value);
    },
    getSessionStorageItem(key,defaultValue){
        let value = window.sessionStorage.getItem(key)
        try {
            value = JSON.parse(value);
        } catch (error) {
            console.log(error)
        }
        return value || defaultValue;
    },
    removeSessionStorageItem(key){
        window.sessionStorage.removeItem(key)
    },
    clearSessionStorage(){
        window.sessionStorage.clear();
    }
}