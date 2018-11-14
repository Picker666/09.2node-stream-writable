/*
* @Author: Administrator
* @Date:   2018-11-08 17:14:23
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-08 17:24:22
*/

'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');

var file = path.resolve('one.txt');
var file2 = path.resolve('two.txt');

http.createServer(function(request, response){
	var pathName = request.url;
	console.log(pathName);
	if (pathName !== '/favicon.ico') {
		var readable = fs.createReadStream(file, { highWaterMark: 5 });
		var writable = fs.createWriteStream(file2, {
			defaultEncoding: 'utf8',
			flags: 'a+'
		});

		readable.on('data', function(chunk) {
			writable.write(chunk);
			console.log('data....');
		});

		readable.on('end', function () {
			writable.end('');
		})

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

