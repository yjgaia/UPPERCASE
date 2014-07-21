// test POST request.
POST({
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test POST request with parameters.
POST({
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test POST request with data.
POST({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test TestBox POST request with data. (when import UPPERCASE-BOX.JS.)
TestBox.POST({
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});
