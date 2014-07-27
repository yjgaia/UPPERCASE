// test PUT request.
PUT({
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test PUT request with parameters.
PUT({
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test PUT request with data.
PUT({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test TestBox PUT request with data. (when import UPPERCASE-BOX.JS.)
TestBox.PUT({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});
