TEST('SOUND', function(check) {
	'use strict';
	
	var
	// sound
	sound = SOUND({
		ogg : 'UPPERCASE-CORE/AMemoryAway.ogg',
		mp3 : 'UPPERCASE-CORE/AMemoryAway.mp3'
	});
	
	sound.play();
	
	DELAY(3, function() {
		sound.pause();
	});
	
	DELAY(4, function() {
		sound.play();
	});
	
	DELAY(5, function() {
		sound.stop();
	});
});
