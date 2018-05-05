var pack=[{"attr":"innerHTML","child":"","id":"DIV.stit.clearfix"}]
var util=require('util');
var Code = require('./code')
var $=null;
var uuid = {};
module.exports= function $cla$() {
  $=jquery
  this.init()
  result = [];
  for (var i =0;i<pack.length;i++){
    uuid[this.addElecode({'class':pack[i]['id']},bb)]=pack[i]
  }
  this.end()
}

$cla$.prototype.hookover = function () {
  var con = '';
  for(var i=0;i<result.length;i++){
    con +=result[i]+"\n";
  }
  fs.writeFile('$cla$.csv',filecon,function () {
  })
}
var result= []
function bb(dom,uid){
  var pa = uuid[uid];
  var ele = $(dom).find(pa['child']);
  ele.attr('attr')
  var re = ele.attr(pa['attr'])
  if (!re) {
    re = ele.get(0)[pa['attr']]
  }
  delete uuid[uid];
  result[re]
}

util.inherits($cla$,Code)