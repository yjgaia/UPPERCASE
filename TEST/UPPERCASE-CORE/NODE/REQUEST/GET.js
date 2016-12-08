TEST('GET', function(check) {
	'use strict';

	// test GET request with url.
	GET('http://google.com', function(content) {
		console.log(content);
	});
	
	// test GET request with url.
	GET('http://localhost:8810/request_test', function(content) {
		check(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test GET request with parameters.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
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
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'request_test_json'
	}, function(content) {
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
	}, function(content) {
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
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});
});
