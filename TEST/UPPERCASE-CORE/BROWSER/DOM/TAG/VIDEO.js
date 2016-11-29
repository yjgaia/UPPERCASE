TEST('VIDEO', function(check) {
	'use strict';
	
	var
	// video
	video = VIDEO({
		webm : 'video.webm',
		ogg : 'video.ogg',
		mp4 : 'video.mp4',
		isNoControls : true,
		isLoop : true,
		isMuted : true
	}).appendTo(BODY);
	
	video.play();
	
	/*DELAY(3, function() {
		video.pause();
	});
	
	DELAY(5, function() {
		video.stop();
	});*/
});
