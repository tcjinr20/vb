$=require('jquery')
var UUID = require('uuid')

var Code=module.exports = function Code(dis){

}
var backlist ={};
Code.prototype.init = function () {
    this.__codelist = []
    this.__hold = 0;
}
//一直循环获取，除非返回false||0
Code.prototype.hookcode = function () {

    if(this.__hold>0 && this.__codelist.length>0 && this.__codelist[0]['code']==-1){
        return {'code':-1}
    }
    if(this.__codelist.length>0)
        return this.__codelist.shift()
    else {
        return {'code':0}
    }
}

Code.prototype.hookover = function(){

}
// 1
Code.prototype.hookhtml = function(html){
    if(backlist[ele['uuid']]){
        backlist[ele['uuid']].call(this,ele['html'])
        delete backlist[ele['uuid']]
    }
}
// 2 {lcaol,pool}
Code.prototype.hookval = function (val) {
    if(backlist[ele['uuid']]){
        backlist[ele['uuid']].call(this,ele['html'])
        delete backlist[ele['uuid']]
    }
}
// 3 innertHTML || {'class':po,'id':po,label:body,attr:[localName,offsetHeight]}
Code.prototype.hookele = function (ele) {
    if(backlist[ele['uuid']]){
        backlist[ele['uuid']].call(this,ele['html'])
        delete backlist[ele['uuid']]
    }
}

Code.prototype.addCode = function(code,param,back){
    if(code != 0 && !code){
        throw new Error('code is not null')
        return
    }
    var p={};
    p['code']=code;
    if(param)p['param']=param
    p['uuid']=UUID()
    this.__codelist.push(p)
    if(back)backlist[p['uuid']]=back
    return p['uuid']
}

Code.prototype.sleep=function () {
    this.addCode(-1)
    this.__hold ++;
}

Code.prototype.goon=function () {
    this.__hold--;
}

Code.prototype.end = function () {
    return this.addCode(0)
}
//{'class':po,'id':po,label:body,attr:[localName,offsetHeight]}
Code.prototype.addElecode =function(pa,back){
    return this.addCode(3,pa,back);
}
// pa 参数是一个数组，window 获取的变量
Code.prototype.addValcode = function (pa,back) {
    return this.addCode(2,pa,back)
}

Code.prototype.addHtmlcode = function () {
    this.__codelist.push({'code':1})
}
Code.prototype.addURLcode = function (url) {
    this.__codelist.push({'code':4, 'url':url})
}

