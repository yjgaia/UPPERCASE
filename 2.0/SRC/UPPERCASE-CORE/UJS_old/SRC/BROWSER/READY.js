/**
 * document ready.
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
