TEST('REQUEST', function(ok) {
	'use strict';

	// test request.
	TestBox.REQUEST({
		method : 'GET',
		uri : 'AJAX_TEST',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request(GET) with parameters.
	TestBox.REQUEST({
		method : 'GET',
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request(POST) with parameters.
	TestBox.REQUEST({
		method : 'POST',
		uri : 'AJAX_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request with data.
	TestBox.REQUEST({
		method : 'POST',
		uri : 'AJAX_TEST',
		data : {
			thisis : 'data'
		},
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(content === 'Request DONE!');
	});

	// test request.
	TestBox.GET({
		uri : 'AJAX_JSON_TEST',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request(GET) with parameters.
	TestBox.REQUEST({
		method : 'GET',
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request(POST) with parameters.
	TestBox.REQUEST({
		method : 'POST',
		uri : 'AJAX_JSON_TEST',
		paramStr : 'thisis=parameter',
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});

	// test request with data.
	TestBox.POST({
		uri : 'AJAX_JSON_TEST',
		data : {
			thisis : 'data'
		},
		isNotUsingLoadingBar : true
	}, function(content) {
		ok(CHECK_ARE_SAME([PARSE_STR(content), {
			thisis : 'JSON'
		}]));
	});
});
