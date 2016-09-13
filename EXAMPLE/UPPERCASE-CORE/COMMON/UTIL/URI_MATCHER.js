TEST('URI_MATCHER', function(ok) {
	'use strict';

	var
	// uri matcher
	uriMatcher = URI_MATCHER('test/{id}'),

	// result
	result = uriMatcher.check('test/1234');

	ok(result.checkIsMatched() === true);

	ok(CHECK_ARE_SAME([result.getURIParams(), {
		id : '1234'
	}]) === true);
});
