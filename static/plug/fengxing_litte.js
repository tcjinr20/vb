
var util=require('util');
var Code = require('./code')
const fs = require('fs')
var $=null;
var page = 1;
var pageurl = 'http://psi.funshion.com/v5/site/videolist?ves=1&cl=mweb&uc=111&site_id=66&channel_id=&sz=40&pg=';
var playurl ='http://m.fun.tv/vplay/?vid='
var task=[]
var FengXing = module.exports =function (jquery) {
    $=jquery
    this.init()
    this.addURLcode('http://m.fun.tv/channel/?id=66')
    this.sleep();
    this.getApi()
}

FengXing.prototype.getApi=function (){
    var self = this;
    $.getJSON(pageurl+page,{},function(d){
        if(d.retmsg=='ok'){
            task=task.concat(d['infos'])
            if(d['infos'].length>0)self.startTask();
        }
    });
}
FengXing.prototype.startTask = function (){
    if(task.length>0){
        this.goon();
        this.addURLcode(playurl+task[0]['id'])
        console.log(playurl+task[0]['id'])
        this.addElecode({'label':'video'},function(p){
            console.log(p)
        })
        this.sleep()
    }
}



util.inherits(FengXing,Code)