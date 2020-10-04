/*
 * UDP 소켓 서버를 생성하는 CLASS
 */
global.UDP_SERVER = CLASS({

	init: (inner, self, port, requestListener) => {
		//REQUIRED: port
		//REQUIRED: requestListener

		let dgram = require('dgram');
		let server = dgram.createSocket('udp6');

		let send = self.send = (params) => {
			//REQUIRED: params
			//REQUIRED: params.ip
			//REQUIRED: params.port
			//REQUIRED: params.content

			let message = new Buffer(params.content);

			server.send(message, 0, message.length, params.port, params.ip);
		};

		server.on('message', (message, nativeRequestInfo) => {

			let ip = nativeRequestInfo.address;
			let port = nativeRequestInfo.port;

			// IPv6 to IPv4
			if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
				ip = ip.substring(7);
			}

			requestListener(

				// request info	
				{
					ip: ip,
					port: port
				},

				// content
				message.toString(),

				// response.
				(content) => {

					send({
						ip: ip,
						port: port,
						content: content
					});
				}
			);
		});

		server.on('listening', () => {
			console.log('[UDP_SERVER] ' + MSG({
				ko: 'UDP 서버가 실행중입니다. (포트:' + port + ')'
			}));
		});

		server.bind(port);
	}
});
