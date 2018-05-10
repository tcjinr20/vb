var util = require('util')
var Code = require('./code')
const fs = require('fs')
const $ = require('jquery')
var Mend = module.exports =function (jquery) {
  this.init()
  this.sleep();
  this.jis =[]
  this.getp()
}
var server = "http://basezhushou.cn/?c=api&m=vod";
var $id = 43;
Mend.prototype.getp = function (){
  var self = this;
    self.jis=[]
    console.log($id)
  $.post(server,{'id':$id},function (e) {
      console.log(e)
    var url = e['url'].split('###')
    if(!e['id']){
      console.log('over')
      return;
    }
    if(parseInt(e['id'])>$id)$id=parseInt(e['id'])
    if(url[0]=='XX'){
      var arr= url[1].split('\n')
      for(var i=0;i<arr.length;i++){
        self.jis.push(arr[i].split("$"))
      }
      self.getVideo()
    }else{
      $id++;
      self.getp()
    }
  },'json')

}
var videos=[]
Mend.prototype.getVideo=function (){
    console.log('getVideo')
  var self =this;
  if(self.jis.length>0){
      self.goon()
      self.addURLcode(self.jis[0][1])
      self.wait(1000);
      self.addElecode({'label':'video'},function (e) {
        videos.push([self.jis[0][0],$(e).attr('src')])
        self.jis.shift()
        self.getVideo()
      })
      self.sleep()
  }else{
      console.log('go getip')
    if(videos.length>0){
      var obj={'id':$id,'act':'up'}
      var jj=[]
      for(var i=0;i<videos.length;i++){
        jj.push(videos[i].join('$'))
      }
      obj['url']=['ck',jj.join('\n')].join('###');
      $.post(server,obj,function(){self.getp()})
    }else {
      console.log('over')
    }
  }
}

util.inherits(Mend, Code)