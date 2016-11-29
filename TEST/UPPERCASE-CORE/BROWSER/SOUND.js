TEST('SOUND', function(check) {
	'use strict';
	
	var
	// sound
	sound = SOUND({
		ogg : 'AMemoryAway.ogg',
		mp3 : 'AMemoryAway.mp3'
	});
	
	sound.play();
	
	DELAY(3, function() {
		sound.pause();
	});
	
	DELAY(4, function() {
		sound.play();
	});
});
