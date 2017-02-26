TEST('AUDIO', (check) => {
	
	/*let audio = AUDIO({
		ogg : 'UPPERCASE-CORE/AMemoryAway.ogg',
		mp3 : 'UPPERCASE-CORE/AMemoryAway.mp3'
	}).appendTo(BODY)*/
	
	let audio2 = AUDIO({
		ogg : 'UPPERCASE-CORE/sound.ogg',
		mp3 : 'UPPERCASE-CORE/sound.mp3',
		isLoop : true
	}).appendTo(BODY);
	
	/*audio.play();
	
	DELAY(3, () => {
		audio.pause();
	});
	
	DELAY(5, () => {
		audio.stop();
	});*/
});
