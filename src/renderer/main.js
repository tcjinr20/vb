$ = require('jquery')
const config = require('../config')
const localhttp = require('../httpserver')
const fs = require('fs')
const webview = document.querySelector('webview')
const hook = require('./lib/htmlhook')
const path = require('path')
const {ipcRenderer} = require('electron')
const mousehook = require('./lib/mousehook')
let inited = false
webview.addEventListener('dom-ready', init)
webview.addEventListener('did-navigate', function (e) {
  $('#weburl').val(e['url'])
  e.propertyIsEnumerable()
  e.preventDefault()
  return false
})
// webview.addEventListener('will-navigate',function (e) {
//     console.log(e)
//     e.preventDefault()
//     e.propertyIsEnumerable()
//     return false
// })
webview.addEventListener('did-navigate-in-page', function (e, url) {
  e.propertyIsEnumerable()
  e.preventDefault()
  return false
})
webview.addEventListener('update-target-url', function (e) {
  $('#foot').text(e['url'])
})

ipcRenderer.on('toggleDevTools', function () {
  if (webview.isDevToolsOpened()) {
    webview.closeDevTools()
  } else {
    webview.openDevTools({ detach: true })
  }
})

webview.addEventListener('new-window', (e) => {
  navigation(e['url'])
})

function init (e) {
  if (inited) return
  inited = true
  $('#leftpanelbtn').click(function () {
    $('#leftpanel').toggle()
  })

  $("#goback").click(function () {
    if(webview.canGoBack()){
      webview.goBack()
    }
  })

  $('#forwark').click(function (e) {
    if(webview.canGoForward()){
      webview.goForward()
    }else{
      navigation($('#weburl').val())
    }
  })

  $('#weburl').keypress(function (e) {
    if (e.keyCode == 13) {
      navigation($('#weburl').val())
    }
  })

  $('#refresh').click(function () {
    webview.reload()
  })
  hook.init(webview)
  $('#plugrefresh').click(walkplug)
  $('#target').click(insertMouseHook)
  $("#gettarget").click(getMouseHook)
    $("#showcatch").click(showcatch)
  walkplug()
}
init()
function showcatch() {
    ipcRenderer.send("showcatch")
}

function insertMouseHook () {
  mousehook.insert(webview)
}

function getMouseHook(){
  mousehook.hook()
}
function walkplug () {
  var templete = '<tr>\n' +
      '                            <td>{name}</td>\n' +
      '                            <td>{inum}</td>\n' +
      '                            <td>\n' +
      '                                <button class="btn btn-mini btn-default plugstart" data-name="{name}">\n' +
      '                                    <span class="icon icon-play"></span>\n' +
      '                                </button>\n' +
      '                                <button class="btn btn-mini btn-default plugstop" data-name="{name}" style="display: none">\n' +
      '                                    <span class="icon icon-stop"></span>\n' +
      '                                </button>\n' +
      '                                <button class="btn btn-mini btn-default plugrefresh" data-name="{name}" style="display: none">\n' +
      '                                    <span class="icon icon-arrows-ccw"></span>\n' +
      '                                </button>\n' +
      '                            </td>\n' +
      '                        </tr>'
  $('#plugname').empty()
  fs.readdir(config.PLUG_PATH, function (err, files) {
    if (!err) {
      var items = ''
      for (var i = 0; i < files.length; i++) {
        // $('#plugname').append("<option>"+path.parse(files[i])['name']+"</option>")
        if (files[i] === 'code.js') continue
        items += templete.replace(/{name}/g, path.parse(files[i])['name']).replace('{inum}', i)
      }
      $('#plugname').append(items)
      $('.plugstart').click(function (e) {
        $(e.currentTarget).hide()
        var nn = $(e.currentTarget).data('name')
        $('.plugstop[data-name=' + nn + ']').show()
        hook.setplug(nn)
      })
      $('.plugrefresh').click(function (e) {
        $(e.currentTarget).hide()
        var nn = $(e.currentTarget).data('name')
        $('.plugstop[data-name=' + nn + ']').show()
        hook.reRun(nn)
      })
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
