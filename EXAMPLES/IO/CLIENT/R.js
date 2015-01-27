TEST('R', function(ok) {
	'use strict';
	
	ok(TestBox.R('img/test.png') === '/TestBox/R/img/test.png?version=' + CONFIG.version);
});
