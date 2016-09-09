/**
 * Load css.
 */
global.LOAD_CSS = METHOD({

	run : function(urlOrParams, handlers) {
		'use strict';
		//REQUIRED: urlOrParams
		//REQUIRED: urlOrParams.url
		//OPTIONAL: urlOrParams.host
		//OPTIONAL: urlOrParams.port
		//OPTIONAL: urlOrParams.isSecure
		//OPTIONAL: urlOrParams.uri
		//OPTIONAL: urlOrParams.paramStr
		//OPTIONAL: urlOrParams.isNoCache
		//OPTIONAL: handlers
		//OPTIONAL: handlers.error

		var
		// url
		url,

		// is no Cache
		isNoCache,

		// host
		host,

		// port
		port,

		// is secure
		isSecure,

		// uri
		uri,

		// param str
		paramStr,

		// error handler.
		errorHandler,

		// link el
		linkEl,

		// is loaded
		isLoaded;

		if (CHECK_IS_DATA(urlOrParams) !== true) {
			url = urlOrParams;
		} else {

			url = urlOrParams.url;

			if (url === undefined) {

				host = urlOrParams.host === undefined ? BROWSER_CONFIG.host : urlOrParams.host;
				port = urlOrParams.port === undefined ? BROWSER_CONFIG.port : urlOrParams.port;
				isSecure = urlOrParams.isSecure;
				uri = urlOrParams.uri;
				paramStr = urlOrParams.paramStr;

				url = (isSecure === true ? 'https://' : 'http://') + host + ':' + port + '/' + uri + '?' + paramStr;
			}

			isNoCache = urlOrParams.isNoCache;
		}

		if (handlers !== undefined) {
			errorHandler = handlers.error;
		}

		linkEl = document.createElement('link');
		linkEl.rel = 'stylesheet';
		linkEl.href = (url.indexOf('?') === -1 ? url + '?' : url + '&') + (isNoCache !== true && CONFIG.version !== undefined ? 'version=' + CONFIG.version : (new Date()).getTime());

		try {
			// this work only IE >= 9
			linkEl.onerror = errorHandler;
		} catch (e) {
			// ignore.
		}

		// create link.
		return DOM({
			el : linkEl
		}).appendTo(DOM({
			el : document.getElementsByTagName('head')[0]
		}));
	}
});
