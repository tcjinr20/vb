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

if(tele){
    if(attr){
        var obj={};
        for (var j = 0;j<attr.length;j++){
            obj[attr[j]]=tele[attr[j]]
        }
        ele=obj
    }else{
        if(c3uuid){
            ele={
                uuid:c3uuid,
                html:tele.outerHTML
            }
        }else{
            ele = tele.outerHTML;
        }
    }
}else{
    if(c3uuid){
        ele={
            uuid:c3uuid,
            html:'can not find '+query
        }
    }else{
        ele = 'can not find '+query;
    }
}

