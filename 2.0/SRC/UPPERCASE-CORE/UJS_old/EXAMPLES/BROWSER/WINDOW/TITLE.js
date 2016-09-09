TEST('TITLE', function(ok) {
	'use strict';

	// change browser's title.
	TITLE('Title Changed.');
	
	ok(TITLE() === 'Title Changed.');
});
