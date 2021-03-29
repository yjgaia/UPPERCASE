TEST('URI_MATCHER', (check) => {

	let uriMatcher = URI_MATCHER('test/{id}');
	
	let result = uriMatcher.check('test/1234');

	check(result.checkIsMatched() === true);

	check(CHECK_ARE_SAME([result.getURIParams(), {
		id : '1234'
	}]) === true);
});
