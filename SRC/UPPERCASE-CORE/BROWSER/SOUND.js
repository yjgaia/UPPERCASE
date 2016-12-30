/**
 * 사운드 파일을 재생하는 SOUND 클래스
 */
global.SOUND = CLASS(function(cls) {
	'use strict';

	var
	// audio context
	audioContext;

	return {

		init : function(inner, self, params) {
			//REQUIRED: params
			//OPTIONAL: params.ogg
			//OPTIONAL: params.mp3
			//OPTIONAL: params.isLoop

			var
			// ogg
			ogg = params.ogg,
			
			// mp3
			mp3 = params.mp3,

			// is loop
			isLoop = params.isLoop,

			// request
			request,

			// buffer
			buffer,

			// source
			source,
			
			// started at
			startedAt = 0,
			
			// paused at
			pausedAt = 0,

			// delayed.
			delayed,

			// play.
			play,

			// pause.
			pause,

			// stop.
			stop;
			
			// init audioContext.
			if (audioContext === undefined) {
				audioContext = new AudioContext();
			}
			
			request = new XMLHttpRequest();
			request.open('GET', new Audio().canPlayType('audio/ogg') !== '' ? ogg : mp3, true);
			request.responseType = 'arraybuffer';

			request.onload = function() {

				audioContext.decodeAudioData(request.response, function(_buffer) {

					var
					// gain
					gain = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();

					buffer = _buffer;

					// default volume
					// support both webkitAudioContext or standard AudioContext
					gain.connect(audioContext.destination);
					gain.gain.value = 0.5;

					if (delayed !== undefined) {
						delayed();
					}
				});
			};
			request.send();

			self.play = play = function() {

				delayed = function() {

					source = audioContext.createBufferSource();
					// creates a sound source
					source.buffer = buffer;
					// tell the source which sound to play
					source.connect(audioContext.destination);
					// connect the source to the context's destination (the speakers)
					// support both webkitAudioContext or standard AudioContext

					source.loop = isLoop;
					
					startedAt = Date.now() - pausedAt;
					source.start(0, pausedAt / 1000);
					
					delayed = undefined;
				};

				if (buffer !== undefined) {
					delayed();
				}

				return self;
			};
			
			self.pause = pause = function() {
				if (source !== undefined) {
					source.stop(0);
					pausedAt = Date.now() - startedAt;
				}
			};

			self.stop = stop = function() {
				if (source !== undefined) {
					source.stop(0);
					pausedAt = 0;
				}
			};
		}
	};
});
