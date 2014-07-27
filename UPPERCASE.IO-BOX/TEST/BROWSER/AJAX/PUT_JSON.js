// test PUT request.
PUT_JSON({
	uri : 'AJAX_JSON_TEST'
}, function(data) {
	console.log(data);
});

// test PUT request with parameters.
PUT_JSON({
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(data) {
	console.log(data);
});

// test PUT request with data.
PUT_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});

// test TestBox PUT request with data. (when import UPPERCASE-BOX.JS.)
TestBox.PUT_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});
