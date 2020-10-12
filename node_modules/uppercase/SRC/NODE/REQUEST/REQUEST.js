/*
 * HTTP 요청을 보냅니다.
 */
global.REQUEST = METHOD((m) => {

	let HTTP = require('http');
	let HTTPS = require('https');
	let URL = require('url');
	let Querystring = require('querystring');

	return {

		run: (params, responseListenerOrListeners) => {
			//REQUIRED: params
			//REQUIRED: params.method	요청 메소드. GET, POST, PUT, DELETE를 설정할 수 있습니다.
			//OPTIONAL: params.isSecure	HTTPS 프로토콜인지 여부
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.uri
			//OPTIONAL: params.url		요청을 보낼 URL. url을 입력하면 isSecure, host, port, uri를 입력할 필요가 없습니다.
			//OPTIONAL: params.paramStr	a=1&b=2&c=3과 같은 형태의 파라미터 문자열
			//OPTIONAL: params.params	데이터 형태({...})로 표현한 파라미터 목록
			//OPTIONAL: params.data		UPPERCASE 웹 서버로 보낼 데이터. 요청을 UPPERCASE기반 웹 서버로 보내는 경우 데이터를 직접 전송할 수 있습니다.
			//OPTIONAL: params.headers	요청 헤더
			//OPTIONAL: responseListenerOrListeners
			//OPTIONAL: responseListenerOrListeners.error
			//OPTIONAL: responseListenerOrListeners.success

			let method = params.method;
			let isSecure = params.isSecure;
			let host = params.host;
			let port = params.port;
			let uri = params.uri;
			let url = params.url;
			let paramStr = params.paramStr;
			let _params = params.params;
			let data = params.data;
			let headers = params.headers;

			let errorListener;
			let responseListener;

			let urlData;
			let req;

			method = method.toUpperCase();

			if (url !== undefined) {
				urlData = URL.parse(url);

				host = urlData.hostname === TO_DELETE ? undefined : urlData.hostname;
				port = urlData.port === TO_DELETE ? undefined : INTEGER(urlData.port);
				isSecure = urlData.protocol === 'https:';
				uri = urlData.pathname === TO_DELETE ? undefined : urlData.pathname.substring(1);

				let urlParamStr = urlData.query === TO_DELETE ? undefined : urlData.query;

				if (urlParamStr !== undefined) {
					if (paramStr === undefined) {
						paramStr = urlParamStr;
					} else {
						paramStr = urlParamStr + '&' + paramStr;
					}
				}
			}

			if (port === undefined) {
				port = isSecure !== true ? 80 : 443;
			}

			if (uri !== undefined && uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}

			if (_params !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + Querystring.stringify(_params).trim();
			}

			if (data !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
			}

			if (paramStr === undefined) {
				paramStr = '';
			}

			if (responseListenerOrListeners !== undefined) {
				if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
					responseListener = responseListenerOrListeners;
				} else {
					errorListener = responseListenerOrListeners.error;
					responseListener = responseListenerOrListeners.success;
				}
			}

			// GET request.
			if (method === 'GET') {

				req = (isSecure !== true ? HTTP : HTTPS).get({
					rejectUnauthorized: false,
					hostname: host,
					port: port,
					path: '/' + (uri === undefined ? '' : uri) + '?' + paramStr,
					headers: headers
				}, (httpResponse) => {

					// redirect.
					if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {

						GET(httpResponse.headers.location, {
							error: errorListener,
							success: responseListener
						});

						httpResponse.destroy();
					}

					else if (httpResponse.statusCode === 200) {

						let content = '';

						httpResponse.setEncoding('utf-8');
						httpResponse.on('data', (str) => {
							content += str;
						});
						httpResponse.on('end', () => {
							if (responseListener !== undefined) {
								responseListener(content, httpResponse.headers);
							}
						});
					}

					else {
						let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + httpResponse.statusCode;

						if (errorListener !== undefined) {
							errorListener(errorMsg, httpResponse.statusCode);
						} else {
							SHOW_ERROR('REQUEST', errorMsg, params);
						}
					}
				});
			}

			// other request.
			else {

				req = (isSecure !== true ? HTTP : HTTPS).request({
					rejectUnauthorized: false,
					hostname: host,
					port: port,
					path: '/' + (uri === undefined ? '' : uri) + (method === 'DELETE' ? '?' + paramStr : ''),
					method: method,
					headers: headers
				}, (httpResponse) => {

					if (httpResponse.statusCode === 200) {

						let content = '';

						httpResponse.setEncoding('utf-8');
						httpResponse.on('data', (str) => {
							content += str;
						});
						httpResponse.on('end', () => {
							if (responseListener !== undefined) {
								responseListener(content, httpResponse.headers);
							}
						});
					}

					else {
						let errorMsg = 'HTTP RESPONSE STATUS CODE: ' + httpResponse.statusCode;

						if (errorListener !== undefined) {
							errorListener(errorMsg, httpResponse.statusCode);
						} else {
							SHOW_ERROR('REQUEST', errorMsg, params);
						}
					}
				});

				if (method !== 'DELETE') {
					req.write(paramStr);
				}
				req.end();
			}

			req.on('error', (error) => {

				let errorMsg = error.toString();

				if (errorListener !== undefined) {
					errorListener(errorMsg);
				} else {
					SHOW_ERROR('REQUEST', errorMsg, params);
				}
			});
		}
	};
});
