/**
 * 모든 JavaScript를 불러와, 웹 페이지가 실행될 준비가 되면 주어진 핸들러를 실행합니다.
 */
global.READY = METHOD(function(m) {
	'use strict';

	var
	// ready count
	readyCount = 0,

	// is loaded
	isLoaded,

	// handlers
	handlers = [],

	// ready load.
	readyLoad,

	// loaded.
	loaded;

	m.readyLoad = readyLoad = function() {
		readyCount += 1;
	};

	m.loaded = loaded = function() {

		readyCount -= 1;

		if (isLoaded === true && readyCount === 0) {

			EACH(handlers, function(handler) {
				handler();
			});

			handlers = [];
		}
	};

	global.onload = function() {

		isLoaded = true;

		if (readyCount === 0) {

			EACH(handlers, function(handler) {
				handler();
			});

			handlers = [];
		}
	};

	return {

		run : function(handler) {
			//REQUIRED: handler

			if (readyCount > 0 || isLoaded !== true) {
				handlers.push(handler);
			} else {
				handler();
			}
		}
	};
});
