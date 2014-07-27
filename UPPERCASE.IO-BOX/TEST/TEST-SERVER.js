var
// port
port = 8810,

// fs
fs = require('fs'),

// path
path = require('path'),

// querystring
qs = require('querystring'),

// server
server = require('http').createServer(function(req, res) {

	var
	// url
	url = req.url,

	// param str
	paramStr,

	// filepath
	filepath,

	// extname
	extname,

	// content type
	contentType;

	if (url.indexOf('?') != -1) {
		paramStr = url.substring(url.indexOf('?') + 1);
		url = url.substring(0, url.indexOf('?'));
	}

	if (url === '/TestBox/AJAX_TEST') {

		if (req.method.toUpperCase() === 'GET') {
			console.log('TestBox', req.method.toUpperCase(), qs.parse(paramStr));
		} else {

			req.on('data', function(data) {
				if (paramStr === undefined) {
					paramStr = '';
				}
				paramStr += data;
			});

			req.on('end', function() {
				console.log('TestBox', req.method.toUpperCase(), qs.parse(paramStr));
			});
		}

		res.end('TestBox request DONE!');

	} else if (url === '/TestBox/AJAX_JSON_TEST') {

		if (req.method.toUpperCase() === 'GET') {
			console.log('TestBox', req.method.toUpperCase(), qs.parse(paramStr));
		} else {

			req.on('data', function(data) {
				if (paramStr === undefined) {
					paramStr = '';
				}
				paramStr += data;
			});

			req.on('end', function() {
				console.log('TestBox', req.method.toUpperCase(), qs.parse(paramStr));
			});
		}

		res.end('{ "BOX" : "TestBox", "thisis" : "JSON" }');

	} else {

		if (url === '/') {
			url = '/TEST.html';
		}

		filepath = './' + url;
		extname = path.extname(filepath);

		switch (extname) {

			case '.js':
				contentType = 'text/javascript';
				break;

			case '.css':
				contentType = 'text/css';
				break;

			case '.jpg':
			case '.jpeg':
				contentType = 'image/jpeg';
				break;

			case '.png':
				contentType = 'image/png';
				break;

			case '.swf':
				contentType = 'application/x-shockwave-flash';
				break;

			case '.html':
				contentType = 'text/html';
				break;

			case '.mp3':
				contentType = 'audio/mpeg';
				break;

			default :
				contentType = 'application/octet-stream';
				break;
		}

		fs.exists(filepath, function(exists) {

			if (exists === true) {

				fs.readFile(filepath, 'binary', function(error, data) {

					if (error === null) {

						res.writeHead(200, {
							'Content-Type' : contentType
						});
						res.write(data, 'binary');
						res.end();

					} else {
						res.writeHead(500, {
							'Content-Type' : 'text/plain'
						});
						res.write(error);
						res.end();
					}
				});

			} else {
				res.writeHead(404, {
					'Content-Type' : 'text/plain'
				});
				res.write('404 Not Found.');
				res.end();
			}
		});
	}
});

server.listen(port);

console.log('UPPERCASE.IO-BOX test server running. - http://localhost:' + port);
