TEST('POST', (check) => {

	// test POST request.
	POST({
		uri : 'request_test'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test POST request with parameters.
	POST({
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test POST request with data.
	POST({
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test POST request.
	POST({
		uri : 'request_test_json'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test POST request with parameters.
	POST({
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test POST request with data.
	POST({
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
