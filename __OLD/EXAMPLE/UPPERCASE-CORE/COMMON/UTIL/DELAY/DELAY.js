TEST('DELAY', function(ok) {
	'use strict';

	var
	// delay
	delay;

	DELAY(function() {
		console.log('just delay!');
	});

	DELAY(2, function() {
		console.log('delay 2 seconds!');
	});

	delay = DELAY(3, function(delay) {
		console.log('delay 3 seconds!');
	});

	DELAY(2, function() {
		delay.remove();
	});
});
