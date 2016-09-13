// load UJS.
require('../../../UJS-NODE.js');

//!! run TEST-SERVER.js before this test.

TEST('PUT', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// test PUT request.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test PUT request with parameters.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
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
		ok(content === 'Request DONE!');
	});

	// test PUT request.
	PUT({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
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
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
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
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});
});
