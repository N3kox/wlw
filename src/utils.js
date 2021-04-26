// let beurl = 'http://localhost:8080';
let beurl = 'http://106.54.102.12:8080/query/'
exports.install = function(Vue){
    Vue.prototype.beurl = beurl;
    Vue.prototype.patchUrl = function(url){
        return beurl + url;
    }
    Vue.prototype.Jset = function(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
    Vue.prototype.Jget = function(key){
        return JSON.parse(localStorage.getItem(key));
    }
    Vue.prototype.JgetAndDelete = function(key){
        let val = localStorage.getItem(key);
        localStorage.removeItem(key);
        return JSON.parse(val);
    }
    Vue.prototype.deepCopy = function(obj){
        return JSON.parse(JSON.stringify(obj));
    }
}