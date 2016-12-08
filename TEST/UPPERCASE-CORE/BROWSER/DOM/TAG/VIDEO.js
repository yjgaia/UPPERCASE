TEST('VIDEO', function(check) {
	'use strict';
	
	var
	// video
	video = VIDEO({
		webm : 'UPPERCASE-CORE/video.webm',
		ogg : 'UPPERCASE-CORE/video.ogg',
		mp4 : 'UPPERCASE-CORE/video.mp4',
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
