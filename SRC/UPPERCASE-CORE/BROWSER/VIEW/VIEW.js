/**
 * 뷰를 정의하기 위한 VIEW 클래스
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

		inner.on = on = function(eventName, eventHandler) {
			//REQUIRED: eventName
			//REQUIRED: eventHandler

			// when change params
			if (eventName === 'paramsChange') {
				paramsChangeHandlers.push(eventHandler);
				if (nowParams !== undefined) {
					eventHandler(nowParams);
				}
			}
			
			// when change uri
			if (eventName === 'uriChange') {
				uriChangeHandlers.push(eventHandler);
				if (nowURI !== undefined) {
					eventHandler(nowURI);
				}
			}

			// when close
			else if (eventName === 'close') {
				closeHandlers.push(eventHandler);
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
