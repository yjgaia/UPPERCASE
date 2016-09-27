TEST('PUT', function(check) {
	'use strict';

	// test PUT request.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test PUT request with parameters.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test PUT request with data.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		check(content === 'Request DONE!');
	});

	// test PUT request.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test PUT request with parameters.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test PUT request with data.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		check(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});
});
