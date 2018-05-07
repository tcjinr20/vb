$= require("jquery")
var util = require('util')
var Code = require('./code')

var btbty = module.exports=function (){
    this.param = {};
    this.param['url']=[]
    this.init()
    this.sleep()
}
var tasks = [];
var running = false;
btbty.prototype.insertTask = function (t) {
    tasks.push(t)
    if(!running){
        this.start(tasks[0]);
        running=true
    }
    return tasks.length;
}

btbty.prototype.giframe=function () {
    var iframe = []
    var self = this;
    if(self.jishu.length>0){

        $.get(self.jishu[0],{},function(e){
            var ur=$(e).find('iframe').attr('src')
            self.param['url'].push(ur)
            self.jishu.shift()
            self.goon()
            self.addURLcode(ur)
            self.wait(1000)
            self.addElecode({'label':'video','attr':'arc'},function (e) {
                console.log(e)
            })
        })
    }else {
        self.post()
    }

}
btbty.prototype.post=function (){
    self.param['source']=self.task['url'];
    self.param['player']=self.task['pid'];
    self.param['cid']=self.task['cid'];
    $.post(self.serurl,self.param,function (e) {
        self.task['param']=self.param
        if(self.back)self.back.call(null,self.task)
    })
}

btbty.prototype.start = function (task) {
    self=this;
    self.back = task['back'];
    self.task = task;
    self.jishu=[]

    $.get(task['url'],{},function(e){
        self.param['img'] =eval($(e).find('.pic').css('background-image'))
        var pps = $(e).find('.text p')
        if(pps.length>0){
            self.param['name'] =pps.get(0).textContent;
            self.param['ator'] = pps.get(1).textContent.replace("主演：",'')
        }

        $(e).find('.playlist1 li').each(function (i,e) {
            self.jishu[i]='http://m.btbtdy.com'+$(e).find('a').attr('href')
        })

        if(self.jishu.length>0)
            self.giframe()
        else{
            alert(task['url']+'没有播放集数')
        }
    })
}

function url(p){
    return p;
}

util.inherits(btbty, Code)