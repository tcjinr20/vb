var util = require('util')
var Code = require('./code')
const fs = require('fs')
var Mend = module.exports =function (jquery) {
  $ = jquery
  this.init()
  this.sleep();
  this.jis =[]
  this.getp()
}
var server = "http://basezhushou.cn/?c=api&m=vod";
var $id = 17;
Mend.prototype.getp = function (){
  var self = this;
  $.getJSON(server,{'id':$id},function (e) {
    console.log(e)
    var url = e['url'].split('###')
    if(!e['id']){
      console.log('over')
      return;
    }
    $id =e['id']
    if(url[0]=='XX'){
      var arr= url[1].split('\n')
      for(var i=0;i<arr.length;i++){
        self.jis.push(arr[i].split("$"))
      }
      self.getVideo()
    }else{
      $id++;
      console.log('id='+$id)
      self.getp()
    }
  })

}
var videos=[]
Mend.prototype.getVideo=function (){
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
  }else{
    if(videos.length>0){
      var obj={'id':$id,'act':'up'}
      var jj=[]
      for(var i=0;i<videos.length;i++){
        jj.push(videos[i].join('$'))
      }
      obj['url']=['ck',jj.join('\n')].join('###');
      console.log(obj)
      $.get(server,obj,function(){self.getp()})
    }else {
      console.log('over')
    }

  }
}

util.inherits(Mend, Code)