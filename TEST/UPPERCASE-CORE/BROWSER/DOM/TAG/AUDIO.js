TEST('AUDIO', function(ok) {
	'use strict';
	
	var
	// audio
	/*audio = AUDIO({
		ogg : 'AMemoryAway.ogg',
		mp3 : 'AMemoryAway.mp3'
	}).appendTo(BODY),*/
	
	// audio2
	audio2 = AUDIO({
		ogg : 'sound.ogg',
		mp3 : 'sound.mp3',
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
