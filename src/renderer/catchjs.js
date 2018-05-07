$= require("jquery")
const config = require('../config')
const webtag = require('./lib/WebTag')
const path = require('path')
// var ser = 'http://www.op.com/';
var ser = 'http://basezhushou.cn/';

var pluginst = null;
function cheacktask(t){
    var ta = 'p='+t['index'];
    $('span['+ta+']').find('.icon').css('color','#57acf5');
}

$('#public').click(function () {
    var t = {};
    t['url']=$("#urlt").val()
    t['cid']=$("#cid").val()
    t['pid']=$("#playid").val()
    t['back']=cheacktask;
    if(t['cid']==0){
        alert('没有分类')
        return
    }
    if(t['pid']==0){
        alert('没有播放器')
        return
    }
    $("#urlt").val('')
    $("#cid").val(0)
    $("#playid").val(0)

    if(pluginst==null)
        pluginst = webtag.hook($("#plugn").val()).run();
        console.log(pluginst)
    addtask(t)
})

function initdata(){
    $.getJSON(ser+'?c=api&m=daa',{},function (da) {
        if(da.cla){
            for(var i=0;i<da.cla.length;i++){
                $("#cid").append('<option value="'+da.cla[i].id+'">'+da.cla[i].name+'</option>')
            }
        }
        if(da.pla){
            for(var i=0;i<da.pla.length;i++){
                $("#playid").append('<option value="'+da.pla[i].bs+'">'+da.pla[i].name+'</option>')
            }
        }

    })

}
initdata()

function addtask(t){
    var index = pluginst.insertTask(t)
    $("#taskp").append('<span p="'+index+'" class="nav-group-item" href="#"><span class="icon icon-record" style="color:#fc605b"></span>'+t['url']+'</span>')
}



// setInterval(function(){
//     for (var i=0;i<task.length;i++){
//         if(task[i].state==0){
//             // var plugclass = require(path.join(config.STATIC_PATH,'catchplug',task[i]['plug']))
//             // var pp= new plugclass({'api':ser+'?c=api&m='+task[i]['plug'],'view':webtag})
//             pluginst.insertTask(task[i])
//             // pp.start(task[i],function(t){
//             //     cheacktask(t)
//             // });
//             task[i].state=1;
//         }
//     }
// },1000)
