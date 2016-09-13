TEST('SOUND', function(ok) {
	'use strict';

	/**
	 * IE6 ~ IE8 not supported.
	 */

	var
	// sound
	sound = SOUND({
		mp3 : '/EXAMPLES/BROWSER/sound.mp3',
		ogg : '/EXAMPLES/BROWSER/sound.ogg'
	}),

	// loop sound
	loopSound = SOUND({
		mp3 : '/EXAMPLES/BROWSER/sound.mp3',
		ogg : '/EXAMPLES/BROWSER/sound.ogg',
		isLoop : true
	}),

	// a
	a = A({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20
		},
		c : 'Play Sound.',
		on : {
			tap : function() {

				loopSound.play();

				DELAY(3, function() {
					loopSound.stop();
				});
			}
		}
	}).appendTo(BODY);

	sound.play();

	// remove a after 5 seconds.
	DELAY(5, function() {
		a.remove();
	});
});
