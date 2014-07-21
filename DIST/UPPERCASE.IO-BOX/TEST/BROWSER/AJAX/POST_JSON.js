// test POST request.
POST_JSON({
	uri : 'AJAX_JSON_TEST'
}, function(data) {
	console.log(data);
});

// test POST request with parameters.
POST_JSON({
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(data) {
	console.log(data);
});

// test POST request with data.
POST_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});

// test TestBox POST request with data. (when import UPPERCASE-BOX.JS.)
TestBox.POST_JSON({
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});
