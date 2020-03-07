TEST('REQUEST', (check) => {
	
	// test request.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'request_test'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test request(GET) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test request(POST) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test request with data.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test request.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'request_test_json'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test request(GET) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test request(POST) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test request with data.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'request_test_json',
		data : {
			thisis : 'data'
		}
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});
});
