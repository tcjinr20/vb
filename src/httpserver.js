console.log('create http server')
const http = require('http');
const path = require('path');
var fs=require("fs");
var config = require('./config')

http.createServer(function(req,res){

    var pp=path.normalize(path.join(__dirname,'..','static',req.url))
    if (fs.existsSync(pp)){
        fs.readFile(pp,function(err,data){
            if(err){
                res.writeHead(404,{'Content-Type':'text/plain'})
                res.end(err);
            }else{
                res.end(data.toString());
            }
        })
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.end('the file is not find');
    }
}).listen(config.LOCAL_HTTP_PORT);