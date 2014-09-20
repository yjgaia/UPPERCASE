/**
 * run CoffeeScript.
 */
global.RUN_COFFEE = RUN_COFFEE = METHOD(function() {
	'use strict';

	var
	//IMPORT: CoffeeScript
	CoffeeScript = require('coffee-script');

	return {

		run : function(code) {
			//REQUIRED: code

			return CoffeeScript.eval(String(code));
		}
	};
});
