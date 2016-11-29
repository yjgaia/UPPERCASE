TEST('DELETE', function(check) {
	'use strict';

	// test DELETE request.
	DELETE({
		uri : 'request_test'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test DELETE request with parameters.
	DELETE({
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test DELETE request with data.
	DELETE({
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test DELETE request.
	DELETE({
		uri : 'request_test_json'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test DELETE request with parameters.
	DELETE({
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test DELETE request with data.
	DELETE({
		uri : 'request_test_json',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});
});
