/*
 * 뷰를 정의하기 위한 VIEW 클래스
 */
global.VIEW = CLASS({

	init: (inner, self) => {

		let isClosed = false;
		let paramsChangeHandlers = [];
		let uriChangeHandlers = [];
		let closeHandlers = [];

		let nowParams;
		let nowURI;

		let on = inner.on = (eventName, eventHandler) => {
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

		let changeParams = self.changeParams = (params) => {

			nowParams = params;

			EACH(paramsChangeHandlers, (handler) => {
				handler(params);
			});
		};

		let runURIChangeHandlers = self.runURIChangeHandlers = (uri) => {

			nowURI = uri;

			EACH(uriChangeHandlers, (handler) => {
				handler(uri);
			});
		};

		let close = self.close = () => {

			EACH(closeHandlers, (handler) => {
				handler();
			});

			isClosed = true;
		};

		let checkIsClosed = inner.checkIsClosed = () => {
			return isClosed;
		};

		scrollTo(0, 0);
	}
});
