const config = require('../../config')
var fs = require('fs')

module.exports = {
  insert: insert,
  hook: hook
}
var webview = null
function insert (view) {
  webview = view
  var incode = 'var ser = "http://127.0.0.1:'+config.LOCAL_HTTP_PORT+'";fetch("http://127.0.0.1:' + config.LOCAL_HTTP_PORT + '/js/mouseinsert.js").then(resp =>resp.text()).then(back=>{eval(back)})'
  webview.executeJavaScript(incode, true, null)
}

function hook () {
  if(!webview) return
  var incode = 'var bb = null;fetch("http://127.0.0.1:' + config.LOCAL_HTTP_PORT + '/js/pickhook.js").then(resp =>{bb=resp; return resp.text()}).then(back=>{eval(back);bb["hook"]=nodepick;return bb;})'

  webview.executeJavaScript(incode, true,function(e){
    var script = 'var pack='+JSON.stringify(e['hook']['body'])+'';
    var fn = e['hook']['name']
    if(fn){
      fs.writeFileSync(config.STATIC_PATH+"/plug/"+fn+".js",script);
      alert("抓取完成")
    }else{
      alert('没有文件名，重新保存')
    }

  })
}
