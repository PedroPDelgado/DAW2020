var http = require('http')
var fs = require('fs')

http.createServer(function (req, res){
	console.log('Server listening at port 7777');
	console.log('Incomming request: ' + req.url)
	var url_split = req.url.split("/") 
	var num = url_split[url_split.length-1]
	if (req.url.length == 1){
		fs.readFile('arqs/index.html', function(err, data){
			res.writeHead(200, {'Content-Type': 'text/html' })
			res.write(data)
			res.end()
		})
	}
	else if(num >= 0 && num < 122 && req.url.match(/\/arqs\/[0-9][0-9]?[0-9]?$\/?/)){
		fs.readFile('arqs/arq' + num + '.html', function(err, data){
			res.writeHead(200, {'Content-Type': 'text/html' })
			res.write(data)
			res.end()
		})
	}else{
		res.writeHead(200, {'Content-Type': 'text/html' })
		res.write("<p>URL errado.</p>")
		res.end()
	}
	
}).listen(7777);
