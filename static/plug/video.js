
var video=module.exports = function Video(dis){
    var self = this;
}
//一直循环获取，除非返回false||0
video.prototype.hookcode = function () {

    // return {'code':3,'param':{'id':'banner','attr':['offsetHeight','innerText']}}
    return {'code':2,'param':['local','offset']}
}
// 1
video.prototype.hookhtml = function(html){
console.log(html)
}
// 2 {lcaol,pool}
video.prototype.hookval = function (val) {
    console.log(val)
}
// 3 innertHTML || {'class':po,'id':po,label:body,attr:[localName,offsetHeight]}
video.prototype.hookele = function (ele) {
    console.log(ele)
}

