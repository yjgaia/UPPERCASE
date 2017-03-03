TEST('GET', (check) => {
	
	// test GET request with url.
	GET('http://google.com', (content) => {
		console.log(content);
	});
	
	// test GET request with url.
	GET('http://localhost:8810/request_test', (content) => {
		check(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test GET request with parameters.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test GET request with data.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, (content) => {
		check(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test_json'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test GET request with parameters.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, (content) => {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test GET request with data.
	GET({
		host : 'localhost',
		port : 8810,
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
