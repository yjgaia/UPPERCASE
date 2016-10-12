/*
 * UDP 서버를 생성합니다.
 */
global.UDP_SERVER = METHOD({

	run : function(portOrParams, requestListener) {
		'use strict';
		//REQUIRED: portOrParams
		//REQUIRED: portOrParams.port
		//OPTIONAL: portOrParams.ipVersion	ip 버전 (4 혹은 6)
		//REQUIRED: requestListener

		var
		//IMPORT: dgram
		dgram = require('dgram'),
		
		// port
		port,
		
		// ip version
		ipVersion = 4,
		
		// server
		server;
		
		// init params.
		if (CHECK_IS_DATA(portOrParams) !== true) {
			port = portOrParams;
		} else {
			port = portOrParams.port;
			ipVersion = portOrParams.ipVersion;
		}
		
		server = dgram.createSocket('udp' + ipVersion);
		
		server.on('message', function(message, nativeRequestInfo) {
			
			var
			// ip
			ip = nativeRequestInfo.address,
			
			// port
			port = nativeRequestInfo.port;
			
			requestListener(
			
			// request info	
			{
				ip : ip,
				
				port : port,
				
				content : message.toString()
			},
			
			// response.
			function(content) {
				
				var
				// message
				message = new Buffer(content);
				
				server.send(message, 0, message.length, port, ip);
			});
		});
		
		server.on('listening', function() {
			console.log('[UDP_SERVER] UDP 서버가 실행중입니다... (포트:' + port + ')');
		});
		
		server.bind(port);
	}
});
