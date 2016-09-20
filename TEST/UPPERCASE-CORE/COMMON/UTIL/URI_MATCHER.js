TEST('URI_MATCHER', function(check) {
	'use strict';

	var
	// uri matcher
	uriMatcher = URI_MATCHER('test/{id}'),

	// result
	result = uriMatcher.check('test/1234');

	check(result.checkIsMatched() === true);

	check(CHECK_ARE_SAME([result.getURIParams(), {
		id : '1234'
	}]) === true);
});
