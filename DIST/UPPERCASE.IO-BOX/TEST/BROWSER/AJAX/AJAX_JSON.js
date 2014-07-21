// test ajax.
AJAX_JSON({
	method : 'GET',
	uri : 'AJAX_JSON_TEST'
}, function(data) {
	console.log(data);
});

// test ajax(GET) with parameters.
AJAX_JSON({
	method : 'GET',
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(data) {
	console.log(data);
});

// test ajax(POST) with parameters.
AJAX_JSON({
	method : 'POST',
	uri : 'AJAX_JSON_TEST',
	paramStr : 'thisis=parameter'
}, function(data) {
	console.log(data);
});

// test ajax with data.
AJAX_JSON({
	method : 'POST',
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});

// test TestBox ajax with data. (when import UPPERCASE-BOX.JS.)
TestBox.AJAX_JSON({
	method : 'POST',
	uri : 'AJAX_JSON_TEST',
	data : {
		thisis : 'data'
	}
}, function(data) {
	console.log(data);
});
