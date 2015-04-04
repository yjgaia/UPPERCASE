OVERRIDE(REQUEST, function(origin) {
	'use strict';

	/**
	 * AJAX request. (fix for IE)
	 */
	global.REQUEST = METHOD({
	
		run : function(params, responseListenerOrListeners) {
			//REQUIRED: params
			//OPTIONAL: params.host
			//OPTIONAL: params.port
			//OPTIONAL: params.isSecure
			//REQUIRED: params.method
			//REQUIRED: params.uri
			//OPTIONAL: params.paramStr
			//OPTIONAL: params.data
			//REQUIRED: responseListenerOrListeners
	
			var
			// host
			host = params.host === undefined ? BROWSER_CONFIG.host : params.host,
	
			// port
			port = params.port === undefined ? (params.host === undefined ? BROWSER_CONFIG.port : 80) : params.port,
	
			// is secure
			isSecure = params.isSecure,
	
			// method
			method = params.method,
	
			// uri
			uri = params.uri,
	
			// param str
			paramStr = params.paramStr,
	
			// data
			data = params.data,

			// response listener
			responseListener,
	
			// error listener
			errorListener,
	
			// url
			url,
	
			// http request
			req;
	
			method = method.toUpperCase();
	
			if (uri.indexOf('?') !== -1) {
				paramStr = uri.substring(uri.indexOf('?') + 1) + (paramStr === undefined ? '' : '&' + paramStr);
				uri = uri.substring(0, uri.indexOf('?'));
			}
	
			if (data !== undefined) {
				paramStr = (paramStr === undefined ? '' : paramStr + '&') + '__DATA=' + encodeURIComponent(STRINGIFY(params.data));
			}
	
			paramStr = (paramStr === undefined ? '' : paramStr + '&') + Date.now();
	
			if (CHECK_IS_DATA(responseListenerOrListeners) !== true) {
				responseListener = responseListenerOrListeners;
			} else {
				responseListener = responseListenerOrListeners.success;
				errorListener = responseListenerOrListeners.error;
			}
	
			url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + uri;

			try {
				req = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e1) {
				req = new ActiveXObject('Microsoft.XMLHTTP');
			}
	
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
							console.log('[UPPERCASE.JS-REQUEST] REQUEST FAILED:', params, error);
						}
					}
				}
			};
	
			// GET request.
			if (method === 'GET') {
				req.open(method, url + '?' + paramStr);
				req.send();
			}
	
			// other request.
			else {
				req.open(method, url);
				req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				req.send(paramStr);
			}
		}
	});
});
