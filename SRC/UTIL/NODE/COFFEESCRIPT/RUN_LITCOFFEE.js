/**
 * run literate CoffeeScript.
 */
global.RUN_LITCOFFEE = RUN_LITCOFFEE = METHOD(function() {
	'use strict';

	var
	//IMPORT: CoffeeScript
	CoffeeScript = require('coffee-script');

	return {

		run : function(codeOrParams) {
			//REQUIRED: codeOrParams
			//REQUIRED: codeOrParams.code
			//OPTIONAL: codeOrParams.fileName

			var
			// code
			code,

			// file name
			fileName;

			if (CHECK_IS_DATA(codeOrParams) !== true) {
				code = codeOrParams;
			} else {
				code = codeOrParams.code;
				fileName = codeOrParams.fileName;
			}

			return CoffeeScript.run(code.toString(), {
				literate : true,
				filename : fileName
			});
		}
	};
});
