$=require("Jquery")
const config = require('../config')
const localhttp = require("../httpserver")
var fs = require("fs");
const webview = document.querySelector('webview')

function init(e){
    console.log(e)
    $('#leftpanelbtn').click(function(){
        $("#leftpanel").toggle()
    })
    $('#forwark').click(function(e){
        navigation($('#weburl').val());
    })

    $('#weburl').keypress(function(e){
        if(e.keyCode==13){
            navigation($('#weburl').val());
        }
    })
    setTimeout(insertScript,100)
}
const scripts=[{'src':'js/test.js','back':insertDOM,'name':'po'}]
function insertScript(){
    for (var i=0;i<scripts.length;i++){
        var incode='var bb; fetch("http://127.0.0.1:'+config.LOCAL_HTTP_PORT+'/'+scripts[i]["src"]+'").then(resp =>{bb=resp;return resp.text()}).then(back=>{eval(back);bb["'+scripts[i]["name"]+'"]='+scripts[i]["name"]+';return bb})';
        webview.executeJavaScript(incode,true,scripts[i]["back"])
    }
}

function navigation(url){
    $('webview').attr({'src':url,'useragent':config.USER_AGENT.andriod,'httpreferrer':'https://www.baidu.com'})
    $('#weburl').val(url)
    webview.addEventListener('dom-ready', init)
}
navigation(config.WEBVIEW_SRC)


function insertDOM(dom){
    console.log(dom)
}

