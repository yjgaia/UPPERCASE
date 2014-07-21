// test ajax.
AJAX({
	method : 'GET',
	uri : 'AJAX_TEST'
}, function(content) {
	console.log(content);
});

// test ajax(GET) with parameters.
AJAX({
	method : 'GET',
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test ajax(POST) with parameters.
AJAX({
	method : 'POST',
	uri : 'AJAX_TEST',
	paramStr : 'thisis=parameter'
}, function(content) {
	console.log(content);
});

// test ajax with data.
AJAX({
	method : 'POST',
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});

// test TestBox ajax with data. (when import UPPERCASE-BOX.JS.)
TestBox.AJAX({
	method : 'POST',
	uri : 'AJAX_TEST',
	data : {
		thisis : 'data'
	}
}, function(content) {
	console.log(content);
});
