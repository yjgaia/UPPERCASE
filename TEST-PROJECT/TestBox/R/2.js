window.b += 1;

var script = document.createElement('script');
script.src = '1.js';
script.onload = function() {
	window.c += 1;
	if (b === c) {
		window.test();
	};
};

script.onreadystatechange = function() {

	var
	// ready state
	readyState = script.readyState;

	if (readyState == 'loaded' || readyState == 'complete') {
		script.onload();
	}
};

document.body.appendChild(script);
