TEST('DELETE', function(check) {
	'use strict';

	// test DELETE request.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'request_test'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test DELETE request with parameters.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test DELETE request with data.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test DELETE request.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'request_test_json'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test DELETE request with parameters.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test DELETE request with data.
	DELETE({
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
