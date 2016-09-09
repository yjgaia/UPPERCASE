TEST('META_DESCRIPTION', function(ok) {
	'use strict';

	META_DESCRIPTION('This is description!');

	ok(META_DESCRIPTION() === 'This is description!');
});
