TEST('POST', function(ok) {
	'use strict';

	// test POST request.
	POST({
		uri : 'AJAX_TEST'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test POST request with parameters.
	POST({
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test POST request with data.
	POST({
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test POST request.
	POST({
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test POST request with parameters.
	POST({
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test POST request with data.
	POST({
		uri : 'AJAX_JSON_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});
});
