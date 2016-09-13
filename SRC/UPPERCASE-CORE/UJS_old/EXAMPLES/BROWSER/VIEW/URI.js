TEST('URI', function(ok) {
	'use strict';

	// go test view.
	GO('go/1');
	
	ok(URI() === 'go/1');
});
