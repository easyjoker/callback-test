var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
    console.log('start request');
    if(req.url == '/'){
        readTitle(res);
    }
    console.log('end request');
}).listen(8000,"127.0.0.1");

function handleError(err,res){
    console.log(err);
    res.end(err);
}

function readTitle(res){
    var response = res;
    fs.readFile('public/data/title.json',function(err,data){
        if(err){
            handleError(err,res);
        }else{
            readTemplate(data,res);
        }
    });
}

function readTemplate(title,res){
    fs.readFile('public/html/template.html',function(err,tmpl){
        if(err){
            handleError(err,res);
        }else{
            formatHtml(JSON.parse(title),tmpl.toString(),res);
        }
    });
}

function formatHtml(data,tmpl,res){
    var html = tmpl.replace('%',data.join('<li></li>'));
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end(html);
}