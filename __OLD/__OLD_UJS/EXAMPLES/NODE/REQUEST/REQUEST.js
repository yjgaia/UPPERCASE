// load UJS.
require('../../../UJS-NODE.js');

//!! run TEST-SERVER.js before this test.

TEST('REQUEST', function(ok) {
	'use strict';

	INIT_OBJECTS();

	// test request.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'AJAX_TEST'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request(GET) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request(POST) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request with data.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test request(GET) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test request(POST) with parameters.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]) === true);
	});

	// test request with data.
	REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'POST',
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
