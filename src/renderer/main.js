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
  if (inited) return
  inited = true
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
  $('#refresh').click(function () {
    webview.reload()
  })
  hook.init(webview)
  $('#plugrefresh').click(walkplug)

  walkplug()
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
      '                            </td>\n' +
      '                        </tr>'
  $('#plugname').empty()
  fs.readdir(config.PLUG_PATH, function (err, files) {
    if (!err) {
      var items ='';
      for (var i = 0; i < files.length; i++) {
        // $('#plugname').append("<option>"+path.parse(files[i])['name']+"</option>")
        items += templete.replace(/{name}/g,path.parse(files[i])['name']).replace('{inum}',i)
      }
      $('#plugname').append(items)
      $('.plugstart').click(function (e) {
        var nn = $(e.currentTarget).data('name')
        hook.setplug(nn)
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
