/*
 * JavaScript 코드를 압축합니다.
 */
global.MINIFY_JS = METHOD(() => {

	let UglifyJS = require('hanul-uglify-js');

	return {

		run : (code) => {
			//REQUIRED: code
			
			code = code.toString();
			
			try {

				return UglifyJS.minify(code, {
					fromString : true,
					mangle : true
				}).code;
			
			} catch(error) {
				
				SHOW_ERROR('MINIFY_JS', error.message, {
					code : (error.pos - 50 > 0 ? '...' : '') + code.substring(error.pos - 50, error.pos + 50) + (error.pos + 50 < code.length ? '...' : ''),
					line : error.line,
					column : error.col
				});
			}
		}
	};
});
