module.exports = {
  init: init,
  insertScript: insertScript,
  getHtml: getHtml,
  getVal: getVal,
  getElement: getElement,
  setplug: setplug,
  reRun: reRun,
  start: start,
  getPlugClass: getPlugClass,
  getPlug: getPlug
}

const config = require('../../config')
const path = require('path')
const jquery = require('jquery')
const htmlpack = {'src': 'plugmeta/html.js', 'back': praseHtml, 'name': 'html'}
const valpack = {'src': 'plugmeta/val.js', 'back': praseVal, 'name': 'val'}
const elepack = {'src': 'plugmeta/ele.js', 'back': praseEle, 'name': 'ele'}

let plug = ''
let webview
let pluginstance
let plugclass
let isruning = false
var clearid = 0

function init (web, plugname) {
  webview = web
  webview.addEventListener('dom-ready', onReady)
  if (plugname)setplug(plugname)
}

function onReady () {
  console.log('ready', isruning)
  if (isruning) {
    run()
  }
}

function stop () {
  clearInterval(clearid)
  isruning = false
}

function run () {
  isruning = true
  clearid = setInterval(function () {
    var pa = pluginstance.hookcode()
    if (pa) {
      switch (pa['code']) {
        case 0:
          isruning = false
          clearInterval(clearid)
          pluginstance.hookover()
          $('.plugstop[data-name=' + plug + ']').hide()
          $('.plugstart[data-name=' + plug + ']').hide()
          $('.plugrefresh[data-name=' + plug + ']').show()
          break
        case 1:
          getHtml()
          break
        case 2:
          getVal(pa['param'], pa['uuid'])
          break
        case 3:
          getElement(pa['param'], pa['uuid'])
          break
        case 4:
          clearInterval(clearid)
          navigate(pa['url'], pa['uuid'])
          break
      }
    } else {
      clearInterval(clearid)
      pluginstance.hookover()
    }
  }, 100)
}

function getPlugClass(){
  return plugclass
}

function getPlug(){
  return pluginstance
}

function start () {
  if (!isruning) {
    run()
  }
  return pluginstance
}

function reRun (plugname) {
  if (plug == plugname) {
    pluginstance = null
    setplug(plugname)
  }
  return pluginstance
}
//每次生成一个实例
function setplug (plugname, code) {
  if (plug && plugname !== plug) {
    console.log('不多插件')
    return
  }
  if (pluginstance && code == 'stop') {
    stop()
    return
  }
  plug = plugname
  if (plugclass == null) { plugclass = require(path.join(config.PLUG_PATH, plug)) }
  if (plugclass == null) {
    console.log(plug + ' not find')
    return
  }
  pluginstance = new plugclass(jquery)
  start()
  return pluginstance
}

function navigate (url) {
  // webview.src=url
  webview.clearHistory()
  webview.loadURL(url, { userAgent: config.CURRENT_USER_AGENT,})
}

function getHtml () {
  insertScript(htmlpack)
}

function getVal (param, uuid) {
  insertScript(valpack, param, uuid)
}
/*
{'class':po,'id':po,label:body,attr:[localName,offsetHeight]}
 */
function getElement (label, uuid) {
  insertScript(elepack, label, uuid)
}

function insertScript (script, param, uuid) {
  var pp = ''
  if (!uuid)uuid = '0'
  pp += "var c3uuid='" + uuid + "';"
  if (param) {
    pp += 'var insertparam=' + JSON.stringify(param)
  }

  var incode = 'var bb;' + pp + ';fetch("http://127.0.0.1:' + config.LOCAL_HTTP_PORT + '/' + script['src'] + '").then(resp =>{bb=resp;return resp.text()}).then(back=>{eval(back);bb["' + script['name'] + '"]=' + script['name'] + ';return bb})'
  webview.executeJavaScript(incode, true, script['back'])
}

function praseHtml (dom) {
  if (pluginstance['hookhtml'])pluginstance['hookhtml'].call(pluginstance, dom['html'], dom['uuid'])
}

function praseVal (dom) {
  if (pluginstance['hookval'])pluginstance['hookval'].call(pluginstance, dom['val'], dom['uuid'])
}

function praseEle (dom) {
  if (pluginstance['hookele'])pluginstance['hookele'].call(pluginstance, dom['ele'], dom['uuid'])
}
