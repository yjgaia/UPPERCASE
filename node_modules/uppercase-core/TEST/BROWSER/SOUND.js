TEST('SOUND', (check) => {
	
	let sound = SOUND({
		ogg : 'UPPERCASE-CORE/AMemoryAway.ogg',
		mp3 : 'UPPERCASE-CORE/AMemoryAway.mp3'
	});
	
	sound.play();
	
	DELAY(3, () => {
		sound.pause();
	});
	
	DELAY(4, () => {
		sound.play();
	});
	
	DELAY(5, () => {
		sound.stop();
	});
});
