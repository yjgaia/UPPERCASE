TEST('PUT', (check) => {

	// test PUT request.
	PUT({
		uri : 'request_test'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test PUT request with parameters.
	PUT({
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test PUT request with data.
	PUT({
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test PUT request.
	PUT({
		uri : 'request_test_json'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test PUT request with parameters.
	PUT({
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test PUT request with data.
	PUT({
		uri : 'request_test_json',
		data : {
			thisis : 'data'
		}
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});
});
