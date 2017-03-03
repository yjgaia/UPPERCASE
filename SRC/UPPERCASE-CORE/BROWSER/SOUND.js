/*
 * 사운드 파일을 재생하는 SOUND 클래스
 */
global.SOUND = CLASS((cls) => {

	let audioContext;

	return {

		init : (inner, self, params) => {
			//REQUIRED: params
			//OPTIONAL: params.ogg
			//OPTIONAL: params.mp3
			//OPTIONAL: params.isLoop

			let ogg = params.ogg;
			let mp3 = params.mp3;
			let isLoop = params.isLoop;
			
			let buffer;
			let source;
			
			let startedAt = 0;
			let pausedAt = 0;
			
			let delayed;
			
			// init audioContext.
			if (audioContext === undefined) {
				audioContext = new AudioContext();
			}
			
			let request = new XMLHttpRequest();
			request.open('GET', new Audio().canPlayType('audio/ogg') !== '' ? ogg : mp3, true);
			request.responseType = 'arraybuffer';

			request.onload = () => {

				audioContext.decodeAudioData(request.response, (_buffer) => {

					let gain = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();

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

			let play = self.play = () => {

				delayed = () => {

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
			
			let pause = self.pause = () => {
				if (source !== undefined) {
					source.stop(0);
					pausedAt = Date.now() - startedAt;
				}
			};

			let stop = self.stop = () => {
				if (source !== undefined) {
					source.stop(0);
					pausedAt = 0;
				}
			};
		}
	};
});
