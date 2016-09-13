/**
 * load JS file.
 */
global.LOAD = METHOD({

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

		// current script
		currentScript,

		// script els
		scriptEls,

		// script el
		scriptEl,

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

		READY.readyLoad();

		scriptEls = document.getElementsByTagName('script');
		currentScript = scriptEls[scriptEls.length - 1];

		scriptEl = document.createElement('script');
		scriptEl.src = (url.indexOf('?') === -1 ? url + '?' : url + '&') + (isNoCache !== true && CONFIG.version !== undefined ? 'version=' + CONFIG.version : (new Date()).getTime());

		scriptEl.onload = function() {

			if (isLoaded !== true) {
				isLoaded = true;

				READY.loaded();
			}
		};

		scriptEl.onreadystatechange = function() {

			var
			// ready state
			readyState = this.readyState;

			if (isLoaded !== true && (readyState === 'loaded' || readyState === 'complete')) {
				isLoaded = true;

				DELAY(function() {
					READY.loaded();
				});
			}
		};

		try {
			// this work only IE >= 9
			scriptEl.onerror = errorHandler;
		} catch (e) {
			// ignore.
		}

		// create script.
		return DOM({
			el : scriptEl
		}).insertAfter(DOM({
			el : currentScript
		}));
	}
});
