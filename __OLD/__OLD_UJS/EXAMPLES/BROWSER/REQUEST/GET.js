TEST('GET', function(ok) {
	'use strict';

	// test GET request.
	GET({
		uri : 'AJAX_TEST'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test GET request with parameters.
	GET({
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test GET request with data.
	GET({
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		}
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test GET request.
	GET({
		uri : 'AJAX_JSON_TEST'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test GET request with parameters.
	GET({
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter'
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test GET request with data.
	GET({
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
