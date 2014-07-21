// test DELETE request.
DELETE_JSON({
	uri : 'AJAX_JSON_TEST'
}, function(data) {
	console.log(data);
});

// test DELETE request with parameters.
DELETE_JSON({
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(data) {
	console.log(data);
});

// test DELETE request with data.
DELETE_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});

// test TestBox DELETE request with data. (when import UPPERCASE-BOX.JS.)
TestBox.DELETE_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});
