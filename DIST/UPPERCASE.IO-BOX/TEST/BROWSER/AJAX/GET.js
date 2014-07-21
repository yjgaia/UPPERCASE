// test GET request.
GET({
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test GET request with parameters.
GET({
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test GET request with data.
GET({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test TestBox GET request with data. (when import UPPERCASE-BOX.JS.)
TestBox.GET({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});
