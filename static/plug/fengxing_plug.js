
var util = require('util')
var Code = require('./code')
const fs = require('fs')
var ser = 'http://www.hv.com/?c=api&m=fengxing';
var $ = null
var page = 2
var pageurl = 'http://psi.funshion.com/v5/site/videolist?ves=1&cl=mweb&uc=111&site_id=66&channel_id=&sz=40&pg='
var playurl = 'http://m.fun.tv/vplay/?vid='
var task = []
var result =[];
var ser = 'http'
var FengXing = module.exports = function (jquery) {
  $ = jquery
  this.init()
  this.addURLcode('http://m.fun.tv/channel/?id=66')
  this.getApi()

}

FengXing.prototype.getApi = function () {
  var self = this
  page++;
  $.getJSON(pageurl + page, {}, function (d) {
    if (d.retmsg == 'ok') {
      task = task.concat(d['infos'])
      if (d['infos'].length > 0)self.startTask()
    }
  })
}
FengXing.prototype.startTask = function () {
  var self = this;
  if (task.length > 0) {
    this.goon()
    this.addURLcode(playurl + task[0]['id'])
    this.wait(7000)
    this.addElecode({'label': 'video'}, function (p) {
      var b=task.shift()
      b['video']=$(p).attr('src')
      b['cid']=4
      $.post(ser,b,self.startTask)
      // console.log(b);
      // $.post(ser,b,function(e){
      //   console.log(e)
      // })
    })
    this.sleep()
  }else{
    // savefile()
    this.getApi()
  }
}

function savefile(){
  var head =  'id,name,video,img \n ';
  var body = '';
  for(var i=0;i<result.length;i++){
    body+=result[i]['id']+","+result[i]['name']+','+result[i]['video']+result[i]['still']+' \n '
  }

  if(page==2){
    fs.writeFile('fengxinglitte'+page+'.cvs',head+body,function(){})
  }else{
    fs.writeFile('fengxinglitte'+page+'.cvs',body,function(){})
  }


}

util.inherits(FengXing, Code)
