var fs = require('fs');
var http = require('http');
var PORT = 7777;
http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', function(err, data){
    if(err){
      return console.log(err);
    }
  res.end(data);
  });
}).listen(PORT);
console.log('Server is running on Port: ',PORT);