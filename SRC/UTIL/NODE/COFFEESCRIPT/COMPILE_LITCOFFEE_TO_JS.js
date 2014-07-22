/**
 * compile literate CoffeeScript to JavaScript.
 */
global.COMPILE_LITCOFFEE_TO_JS = COMPILE_LITCOFFEE_TO_JS = METHOD(function() {'use strict';

	var
	//IMPORT: CoffeeScript
	CoffeeScript = require('coffee-script');

	return {

		run : function(code) {
			//REQUIRED: code

			return CoffeeScript.compile(code, {
				literate : true
			});
		}
	};
});
