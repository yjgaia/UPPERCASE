TEST('POST', function(check) {
	'use strict';

	// test POST request.
	POST({
		uri : 'request_test'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test POST request with parameters.
	POST({
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test POST request with data.
	POST({
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test POST request.
	POST({
		uri : 'request_test_json'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test POST request with parameters.
	POST({
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, function(content) {
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
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});
});
