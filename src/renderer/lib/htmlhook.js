module.exports = {
  init: init,
  insertScript: insertScript,
  getHtml: getHtml,
  getVal: getVal,
  getElement: getElement,
  setplug: setplug
}

const config = require('../../config')
const path = require('path')
const htmlpack = {'src': 'plugmeta/html.js', 'back': praseHtml, 'name': 'html'}
const valpack = {'src': 'plugmeta/val.js', 'back': praseVal, 'name': 'val'}
const elepack = {'src': 'plugmeta/ele.js', 'back': praseEle, 'name': 'ele'}

let plug = 'video'
let webview
let pluginstance
function init (web, plugname) {
  webview = web
  if (plugname)setplug(plugname)
}

function setplug (plugname) {
  plug = plugname
  var plugclass = require(path.join(config.PLUG_PATH, plug))
  if(plugclass==null)return
  pluginstance = new plugclass()
  var clearid = setInterval(function () {
    var pa = pluginstance.hookcode()
    if (pa) {
      switch (pa['code']) {
        case 1:
          getHtml()
          break
        case 2:
          getVal(pa['param'])
          break
        case 3:
          getElement(pa['param'])
          break
        case 4:
          navigate(pa['url'])
          break
      }
    } else {
      clearInterval(clearid)
    }
  }, 100)
}

function navigate (url) {
  webview.loadURL(url)
}

function getHtml () {
  insertScript(htmlpack)
}

function getVal (param) {
  insertScript(valpack, param)
}
/*
{'class':po,'id':po,label:body,attr:[localName,offsetHeight]}
 */
function getElement (label) {
  insertScript(elepack, label)
}

function insertScript (script, param) {
  var pp = ''
  if (param) {
    pp = 'var insertparam=' + JSON.stringify(param)
  }

  var incode = 'var bb;' + pp + ';fetch("http://127.0.0.1:' + config.LOCAL_HTTP_PORT + '/' + script['src'] + '").then(resp =>{bb=resp;return resp.text()}).then(back=>{eval(back);bb["' + script['name'] + '"]=' + script['name'] + ';return bb})'
  webview.executeJavaScript(incode, true, script['back'])
}

function praseHtml (dom) {
  if (pluginstance['hookhtml'])pluginstance['hookhtml'].call(pluginstance, dom['html'])
}

function praseVal (dom) {
  if (pluginstance['hookval'])pluginstance['hookval'].call(pluginstance, dom['val'])
}

function praseEle (dom) {
  if (pluginstance['hookele'])pluginstance['hookele'].call(pluginstance, dom['ele'])
}
