
hook= null;
for(var i=0;i<pickattr.length;i++){
  if(picktarget.hasOwnProperty(pickattr[i])){
    hook[pickattr[i]]=picktarget[pickattr[i]]
  }
}
