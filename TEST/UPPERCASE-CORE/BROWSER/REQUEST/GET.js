TEST('GET', function(check) {
	'use strict';

	// test GET request.
	GET({
		uri : 'request_test'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test GET request with parameters.
	GET({
		uri : 'request_test',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test GET request with data.
	GET({
		uri : 'request_test',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		uri : 'request_test_json'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test GET request with parameters.
	GET({
		uri : 'request_test_json',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test GET request with data.
	GET({
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
