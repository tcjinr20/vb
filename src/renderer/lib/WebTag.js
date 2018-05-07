module.exports = {
    goto:goto,
    hook:hook
}
const config = require('../../config')
var web = document.querySelector('webview')
var htmlhook = require('./htmlhook')
var inited = false;
var readyurl= '';
web.addEventListener('dom-ready',function () {
    if(inited)return
    inited = true;
    if(readyurl){
        goto(readyurl)
        readyurl='';
    }
    htmlhook.init(web)
})

function hook(plug){
    htmlhook.setplug(plug)
    return htmlhook
}

function goto(url){
    if(inited){
        web.loadURL(url,{ userAgent: config.USER_AGENT['andriod']})
    }else{
        readyurl=url;
    }
}

