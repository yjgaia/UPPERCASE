// load UJS.
require('../../../UJS-NODE.js');

//!! run TEST-SERVER.js before this test.

TEST('DELETE', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// test DELETE request.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test DELETE request with parameters.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test DELETE request with data.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test DELETE request.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test DELETE request with parameters.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test DELETE request with data.
	DELETE({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});
});
