var ele
var cla =insertparam['class']
var id=insertparam['id']
var label= insertparam['label']
var attr = insertparam['attr']
var query ='';
if (label) query+=label;
if(id) query+='#'+id
if(cla)query+="."+cla
tele = document.querySelector(query);
console.log(query)
if(tele){
    if(attr){
        var obj={};
        for (var j = 0;j<attr.length;j++){
            obj[attr[j]]=tele[attr[j]]
        }
        ele=obj
    }else{
        ele = tele.innerHTML;
    }
}else{
    ele = 'can not find '+query;
}

