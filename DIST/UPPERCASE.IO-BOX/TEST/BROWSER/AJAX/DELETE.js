// test DELETE request.
DELETE({
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test DELETE request with parameters.
DELETE({
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test DELETE request with data.
DELETE({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test TestBox DELETE request with data. (when import UPPERCASE-BOX.JS.)
TestBox.DELETE({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});
