const config = require('../../config')


module.exports = {
  insert: insert
}
var webview = null
function insert (view) {
  webview = view
  var incode = 'fetch("http://127.0.0.1:' + config.LOCAL_HTTP_PORT + '/js/mousepick.js").then(resp =>resp.text()).then(back=>{eval(back)})'
  console.log(incode)
  webview.executeJavaScript(incode, true, null)
  // var uu= "<script src='http://127.0.0.1:"+ config.LOCAL_HTTP_PORT + "/js/mousepick.js'></script>";
  // console.log(uu)
  // webview.insertText(uu)
  // webview.openDevTools()
}

function tick () {
  var hook = ['textContent']
  var incode = 'var pickattr = ' + JSON.dumps(hook) + ';var bb = null;fetch("http://127.0.0.1:' + config.LOCAL_HTTP_PORT + '/js/pickhook.js").then(resp =>{bb=resp; return resp.text()}).then(back=>{eval(back);bb["hook"]=hook;return bb;})'
  webview.executeJavaScript(incode, true, function (e) {
    if (e) {

    } else {
      setTimeout(tick, 100)
    }
  })
}
