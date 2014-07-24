/**
 * run literate CoffeeScript.
 */
global.RUN_LITCOFFEE = RUN_LITCOFFEE = METHOD(function() {'use strict';

	var
	//IMPORT: CoffeeScript
	CoffeeScript = require('coffee-script');

	return {

		run : function(code) {
			//REQUIRED: code

			return CoffeeScript.run(code, {
				literate : true
			});
		}
	};
});
