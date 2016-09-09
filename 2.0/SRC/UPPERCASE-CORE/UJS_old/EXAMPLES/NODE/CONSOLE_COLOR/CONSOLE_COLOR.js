// load UJS.
require('../../../UJS-NODE.js');

TEST('CONSOLE_COLOR', function(ok) {
	'use strict';

	console.log(CONSOLE_RED('red'));
	console.log(CONSOLE_GREEN('green'));
	console.log(CONSOLE_BLUE('blue'));
	console.log(CONSOLE_YELLOW('yellow'));
});
