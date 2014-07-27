// test GET request.
GET_JSON({
	uri : 'AJAX_JSON_TEST'
}, function(data) {
	console.log(data);
});

// test GET request with parameters.
GET_JSON({
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(data) {
	console.log(data);
});

// test GET request with data.
GET_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});

// test TestBox GET request with data. (when import UPPERCASE-BOX.JS.)
TestBox.GET_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});
