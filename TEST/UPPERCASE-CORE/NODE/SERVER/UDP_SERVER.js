TEST('UDP_SERVER', function(ok) {
	'use strict';

	var
	// server
	server = UDP_SERVER(8126, function(requestInfo, content, response) {
		console.log('IP: ' + requestInfo.ip + ', Port: ' + requestInfo.port + ', Content: ' + content);
	});
	
	server.send({
	    ip : 'localhost',
	    port : 8126,
	    content : 'Hello!'
	});
});
