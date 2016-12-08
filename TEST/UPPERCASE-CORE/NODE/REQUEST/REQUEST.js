TEST('REQUEST', function(check) {
	'use strict';

	// test request.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'request_test'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test request(GET) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test request(POST) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
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
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test request.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'request_test_json'
	}, function(content) {
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
	}, function(content) {
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
	}, function(content) {
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
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});
});
