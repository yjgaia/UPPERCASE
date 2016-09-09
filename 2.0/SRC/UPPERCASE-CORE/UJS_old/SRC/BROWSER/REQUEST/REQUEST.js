/**
 * AJAX request.
 */
global.REQUEST = METHOD({

	run : function(params, responseListenerOrListeners) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.host
		//OPTIONAL: params.port
		//OPTIONAL: params.isSecure
		//REQUIRED: params.method
		//OPTIONAL: params.uri
		//OPTIONAL: params.paramStr
		//OPTIONAL: params.data
		//OPTIONAL: params.headers
		//REQUIRED: responseListenerOrListeners

		var
		// host
		host = params.host === undefined ? BROWSER_CONFIG.host : params.host,

		// port
		port = params.port === undefined ? (params.host === undefined ? BROWSER_CONFIG.port : 80) : params.port,

		// is secure
		isSecure = params.isSecure === undefined ? BROWSER_CONFIG.isSecure : params.isSecure,

		// method
		method = params.method,

		// uri
		uri = params.uri,

		// param str
		paramStr = params.paramStr,

		// data
		data = params.data,
		
		// headers
		headers = params.headers,

		// response listener
		responseListener,

		// error listener
		errorListener,

		// url
		url,

		// http request
		req;

		method = method.toUpperCase();

		if (uri !== undefined && uri.indexOf('?') !== -1) {
			paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
			uri = uri.substring(0, uri.indexOf('?'));
		}

		if (data !== undefined) {
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(data));
		}

		paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();

		if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
			responseListener = responseListenerOrListeners;
		} else {
			responseListener = responseListenerOrListeners.success;
			errorListener = responseListenerOrListeners.error;
		}

		url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + (uri === undefined ? '' : (uri[0] === '/' ? uri.substring(1) : uri));
		
		if (global.fetch !== undefined) {
			
			(method === 'GET' ? fetch(url + '?' + paramStr, {
				method : method,
				credentials : host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
				headers : headers === undefined ? undefined : new Headers(headers)
			}) : fetch(url, {
				method : method,
				body : paramStr,
				credentials : host === BROWSER_CONFIG.host && port === BROWSER_CONFIG.port ? 'include' : undefined,
				headers : headers === undefined ? undefined : new Headers(headers)
			})).then(function(response) {
				return response.text();
			}).then(function(responseText) {
				responseListener(responseText);
			}).catch(function(error) {
				
				if (errorListener !== undefined) {
					errorListener(error);
				} else {
					console.log('[UJS-REQUEST] REQUEST FAILED:', params, error);
				}
			});
		}
		
		else {

			req = new XMLHttpRequest();
	
			req.onreadystatechange = function() {
	
				var
				// error
				error;
	
				// when request completed
				if (req.readyState === 4) {
	
					if (req.status === 200) {
						responseListener(req.responseText);
					} else {
	
						error = {
							code : req.status
						};
	
						if (errorListener !== undefined) {
							errorListener(error);
						} else {
							console.log('[UJS-REQUEST] REQUEST FAILED:', params, error);
						}
					}
				}
			};
	
			// GET request.
			if (method === 'GET') {
				
				req.open(method, url + '?' + paramStr);
				
				if (headers !== undefined) {
					EACH(headers, function(value, name) {
						req.setRequestHeader(name, value);
					});
				}
				
				req.send();
			}
	
			// other request.
			else {
				
				req.open(method, url);
				req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				
				if (headers !== undefined) {
					EACH(headers, function(value, name) {
						req.setRequestHeader(name, value);
					});
				}
				
				req.send(paramStr);
			}
		}
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.REQUEST = METHOD({

		run : function(params, responseListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//REQUIRED: params.method
			//REQUIRED: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//OPTIONAL: params.headers
			//REQUIRED: responseListenerOrListeners

			REQUEST(COMBINE([params, {
				uri : box.boxName + '/' + params.uri
			}]), responseListenerOrListeners);
		}
	});
});
