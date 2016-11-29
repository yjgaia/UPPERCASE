TEST('TITLE', function(check) {
	'use strict';

	// change browser's title.
	TITLE('Title Changed.');
	
	ok(TITLE() === 'Title Changed.');
});
