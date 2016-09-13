TEST('RF', function(ok) {
	'use strict';

	ok(TestBox.RF('img/test.png') === 'http://localhost:8811/__RF/TestBox/img/test.png');
});
