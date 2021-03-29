TEST('DELETE', (check) => {

	// test DELETE request.
	DELETE({
		uri : 'request_test'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test DELETE request with parameters.
	DELETE({
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test DELETE request with data.
	DELETE({
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test DELETE request.
	DELETE({
		uri : 'request_test_json'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test DELETE request with parameters.
	DELETE({
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test DELETE request with data.
	DELETE({
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
