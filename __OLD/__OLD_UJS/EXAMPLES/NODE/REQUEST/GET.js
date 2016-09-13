// load UJS.
require('../../../UJS-NODE.js');

//!! run TEST-SERVER.js before this test.

TEST('GET', function(ok) {
	'use strict';

	INIT_OBJECTS();
	
	// test GET request with url.
	GET('http://google.com', function(content) {
		console.log(content);
	});
	
	// test GET request with url.
	GET('http://localhost:8810/AJAX_TEST', function(content) {
		ok(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test GET request with parameters.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test GET request with data.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test GET request with parameters.
	GET({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test GET request with data.
	GET({
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
