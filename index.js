/*
* @Author: Administrator
* @Date:   2018-11-08 15:41:43
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-08 17:14:14
*/

'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');

var file = path.resolve('one.txt');

http.createServer(function(request, response){
	var pathName = request.url;
	console.log(pathName);
	if (pathName !== '/favicon.ico') {
		var writable = fs.createWriteStream(file2, {
			defaultEncoding: 'utf8',
			flags: 'a+',
			// start: 5,
			// flags: 'w'
		});

		var buf = new Buffer('微工具集:www.gongjuji.net');
		writable.write(buf);
		writable.end('');
		writable.on('finish', function() {
			console.log('game over...');
			response.end('game over !!!');
		});

		writable.on('error', function(error) {
			console.log('it occurs error' + error);
		});

	}
}).listen(8888);

console.log('server is running...');

