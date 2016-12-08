TEST('REQUEST', function(check) {
	'use strict';

	// test request.
	REQUEST({
		method : 'GET',
		uri : 'request_test'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test request(GET) with parameters.
	REQUEST({
		method : 'GET',
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test request(POST) with parameters.
	REQUEST({
		method : 'POST',
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test request with data.
	REQUEST({
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
		method : 'GET',
		uri : 'request_test_json'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request(GET) with parameters.
	REQUEST({
		method : 'GET',
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request(POST) with parameters.
	REQUEST({
		method : 'POST',
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request with data.
	REQUEST({
		method : 'POST',
		uri : 'request_test_json',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});
});
