global.WEB_SERVER_HTTP2 = CLASS((cls) => {

	const HTTP2 = require('http2');
	const FS = require('fs');

	return {

		init: (inner, self, portOrParams, requestListenerOrHandlers) => {

			let port;
			let securedPort;
			let securedKeyFilePath;
			let securedCertFilePath;
			let uploadURI;

			let nativeServer;

			// init params.
			if (CHECK_IS_DATA(portOrParams) !== true) {
				port = portOrParams;
			} else {
				port = portOrParams.port;
				securedPort = portOrParams.securedPort;
				securedKeyFilePath = portOrParams.securedKeyFilePath;
				securedCertFilePath = portOrParams.securedCertFilePath;

				uploadURI = portOrParams.uploadURI;
			}

			let serve = (stream, headers, isSecure) => {

				let uri = headers[':path'];
				let method = headers[':method'].toUpperCase();
				let ip = headers.forwarded;
				let acceptEncoding = headers['accept-encoding'];

				let paramStr;
				let isUploadURI;

				if (ip === undefined) {
					ip = stream.session.socket.remoteAddress;
				}

				// IPv6 to IPv4
				if (ip !== undefined && ip.substring(0, 7) === '::ffff:') {
					ip = ip.substring(7);
				}

				if (acceptEncoding === undefined) {
					acceptEncoding = '';
				}

				if (uri.indexOf('?') !== -1) {
					paramStr = uri.substring(uri.indexOf('?') + 1);
					uri = uri.substring(0, uri.indexOf('?'));
				}

				uri = uri.substring(1);

				isUploadURI = CHECK_IS_ARRAY(uploadURI) === true ? CHECK_IS_IN({
					array: uploadURI,
					value: uri
				}) === true : uploadURI === uri;

				console.log(uri);
				console.log(headers[':method']);
				console.log(headers.forwarded, stream.session.socket.remoteAddress);
				console.log(acceptEncoding);
				console.log(paramStr);
				console.log(isUploadURI);

			};

			// init sever.
			if (port !== undefined) {

				nativeServer = HTTP2.createServer();

				nativeServer.on('stream', (stream, headers) => {

					console.log(stream, headers);

					if (securedPort === undefined) {
						serve(stream, headers, false);
					}

					else {
						stream.respond({
							'location': 'https://' + nativeReq.headers.host + (securedPort === 443 ? '' : ':' + securedPort) + nativeReq.url,
							':status': 302,
						});
						stream.end();
					}
				});

				nativeServer.on('error', (error) => {
					SHOW_ERROR('WEB_SERVER', error.toString());
				});

				nativeServer.listen(port);
			}

			// init secured sever.
			if (securedPort !== undefined) {

				nativeServer = HTTP2.createSecureServer({
					key: FS.readFileSync(securedKeyFilePath),
					cert: FS.readFileSync(securedCertFilePath)
				});

				nativeServer.on('stream', (stream, headers) => {
					serve(stream, headers, true);
				});

				nativeServer.listen(securedPort);
			}
		}
	}
});
