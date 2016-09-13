/**
 * View interface
 */
global.VIEW = CLASS({

	init : function(inner, self) {
		'use strict';

		var
		// is closed
		isClosed = false,

		// params change handlers
		paramsChangeHandlers = [],
		
		// uri change handlers
		uriChangeHandlers = [],

		// close handlers
		closeHandlers = [],
		
		// now params
		nowParams,
		
		// now uri
		nowURI,

		// on.
		on,

		// change params.
		changeParams,
		
		// run uri change handlers.
		runURIChangeHandlers,

		// close.
		close,

		// check is closed.
		checkIsClosed;

		inner.on = on = function(methodName, handler) {
			//REQUIRED: methodName

			// when change params
			if (methodName === 'paramsChange') {
				paramsChangeHandlers.push(handler);
				if (nowParams !== undefined) {
					handler(nowParams);
				}
			}
			
			// when change uri
			if (methodName === 'uriChange') {
				uriChangeHandlers.push(handler);
				if (nowURI !== undefined) {
					handler(nowURI);
				}
			}

			// when close
			else if (methodName === 'close') {
				closeHandlers.push(handler);
			}
		};

		self.changeParams = changeParams = function(params) {
			
			nowParams = params;

			EACH(paramsChangeHandlers, function(handler) {
				handler(params);
			});
		};
		
		self.runURIChangeHandlers = runURIChangeHandlers = function(uri) {
			
			nowURI = uri;
			
			EACH(uriChangeHandlers, function(handler) {
				handler(uri);
			});
		};

		self.close = close = function() {

			EACH(closeHandlers, function(handler) {
				handler();
			});

			isClosed = true;
		};

		inner.checkIsClosed = checkIsClosed = function() {
			return isClosed;
		};
		
		scrollTo(0, 0);
	}
});
