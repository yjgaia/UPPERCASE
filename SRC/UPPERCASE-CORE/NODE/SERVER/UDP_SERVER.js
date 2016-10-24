/*
 * UDP 소켓 서버를 생성하는 CLASS
 */
global.UDP_SERVER = CLASS({

	init : function(inner, self, port, requestListener) {
		'use strict';
		//REQUIRED: port
		//REQUIRED: requestListener

		var
		//IMPORT: dgram
		dgram = require('dgram'),
		
		// server
		server = dgram.createSocket('udp6'),
		
		// send.
		send;
		
		self.send = send = function(params) {
			//REQUIRED: params
			//REQUIRED: params.ip
			//REQUIRED: params.port
			//REQUIRED: params.content
			
			var
			// message
			message = new Buffer(params.content);
			
			server.send(message, 0, message.length, params.port, params.ip);
		};
		
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
				
				port : port
			},
			
			// content
			message.toString(),
			
			// response.
			function(content) {
				
				send({
					ip : ip,
					port : port,
					content : content
				});
			});
		});
		
		server.on('listening', function() {
			console.log('[UDP_SERVER] UDP 서버가 실행중입니다... (포트:' + port + ')');
		});
		
		server.bind(port);
	}
});
