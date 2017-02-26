/*
 * CSS 코드를 압축합니다.
 */
global.MINIFY_CSS = METHOD(() => {

	let Sqwish = require('sqwish');

	return {

		run : (code) => {
			//REQUIRED: code

			return Sqwish.minify(code.toString());
		}
	};
});
