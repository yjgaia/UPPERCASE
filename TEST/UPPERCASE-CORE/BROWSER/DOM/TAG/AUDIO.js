TEST('AUDIO', function(check) {
	'use strict';
	
	var
	// audio
	/*audio = AUDIO({
		ogg : 'UPPERCASE-CORE/AMemoryAway.ogg',
		mp3 : 'UPPERCASE-CORE/AMemoryAway.mp3'
	}).appendTo(BODY),*/
	
	// audio2
	audio2 = AUDIO({
		ogg : 'UPPERCASE-CORE/sound.ogg',
		mp3 : 'UPPERCASE-CORE/sound.mp3',
		isLoop : true
	}).appendTo(BODY);
	
	/*audio.play();
	
	DELAY(3, function() {
		audio.pause();
	});
	
	DELAY(5, function() {
		audio.stop();
	});*/
});
