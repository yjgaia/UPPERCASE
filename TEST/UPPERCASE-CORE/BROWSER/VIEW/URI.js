TEST('URI', function(check) {
	'use strict';

	// go test view.
	GO('go/1');
	
	check(URI() === 'go/1');
});
