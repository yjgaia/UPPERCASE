/**
 * compile CoffeeScript to JavaScript.
 */
global.COMPILE_COFFEE_TO_JS = COMPILE_COFFEE_TO_JS = METHOD(function() {
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

			return CoffeeScript.compile(code.toString(), {
				filename : fileName
			});
		}
	};
});
