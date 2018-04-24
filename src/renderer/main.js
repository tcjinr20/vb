$ = require('Jquery')
const config = require('../config')
const localhttp = require('../httpserver')
const fs = require('fs')
const webview = document.querySelector('webview')
const hook = require('./lib/htmlhook')
const path = require('path')
let inited = false
webview.addEventListener('dom-ready', init)

function init (e) {
    if(inited)return
    inited= true
  $('#leftpanelbtn').click(function () {
    $('#leftpanel').toggle()
  })

  $('#forwark').click(function (e) {
    navigation($('#weburl').val())
  })
  $('#weburl').keypress(function (e) {
    if (e.keyCode == 13) {
      navigation($('#weburl').val())
    }
  })
  $("#refresh").click(function(){
    webview.reload()
  })
  hook.init(webview)
  $('#plugrefresh').click(walkplug)
  $('#plugstart').click(function(){
      hook.setplug($('#plugname').val())
  })
    walkplug()
}



function walkplug(){
    $('#plugname').empty()
    fs.readdir(config.PLUG_PATH,function(err,files){
        if(!err){
            for (var i=0;i<files.length;i++){
                $('#plugname').append("<option>"+path.parse(files[i])['name']+"</option>")
            }
        }
    })
}

function navigation (url) {
  $('webview').attr({'src': url, 'useragent': config.USER_AGENT.andriod, 'httpreferrer': 'https://www.baidu.com'})
  $('#weburl').val(url)
}

navigation(config.WEBVIEW_SRC)

function insertDOM (dom) {
  console.log(dom)
}

