/**
 * run CoffeeScript.
 */
global.RUN_COFFEE = RUN_COFFEE = METHOD(function() {
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
				filename : fileName
			});
		}
	};
});
