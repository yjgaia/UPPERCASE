// load UJS.
require('../../../UJS-NODE.js');

//!! run TEST-SERVER.js before this test.

TEST('POST', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// test POST request.
	POST({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test POST request with parameters.
	POST({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test POST request with data.
	POST({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test POST request.
	POST({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test POST request with parameters.
	POST({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test POST request with data.
	POST({
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
