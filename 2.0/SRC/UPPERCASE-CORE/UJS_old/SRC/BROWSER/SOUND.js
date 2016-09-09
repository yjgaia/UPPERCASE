/**
 * SOUND class
 */
global.SOUND = CLASS(function(cls) {
	'use strict';

	var
	// audio context
	audioContext;

	return {

		init : function(inner, self, params) {
			//REQUIRED: params
			//OPTIONAL: params.mp3
			//OPTIONAL: params.ogg
			//OPTIONAL: params.isLoop

			var
			// src
			src = params.mp3,

			// ogg
			ogg = params.ogg,

			// is loop
			isLoop = params.isLoop,

			// audio
			audio = new Audio(),

			// request
			request,

			// buffer
			buffer,

			// source
			source,

			// delayed.
			delayed,

			// play.
			play,

			// stop.
			stop;

			// Check if we can play mp3, if not then fall back to ogg
			if (audio.canPlayType('audio/mpeg;') === '' && audio.canPlayType('audio/ogg;')) {
				src = ogg;
			}
			
			if (src === undefined) {
				
				self.play = play = function() {
					return self;
				};
	
				self.stop = stop = function() {
					// ignore.
				};
			}
			
			else {
				
				// init audioContext.
				if (audioContext === undefined && global.AudioContext !== undefined) {
					audioContext = new AudioContext();
				}
	
				// if exists audio context
				if (audioContext !== undefined) {
	
					request = new XMLHttpRequest();
					request.open('GET', src, true);
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
	
							if (source.noteOn !== undefined) {
								source.noteOn(0);
							} else {
								source.start(0);
							}
	
							delayed = undefined;
						};
	
						if (buffer !== undefined) {
							delayed();
						}
	
						return self;
					};
	
					self.stop = stop = function() {
	
						if (source !== undefined) {
							if (source.noteOff !== undefined) {
								source.noteOff(0);
							} else {
								source.stop(0);
							}
						}
					};
				}
	
				// if not exists audio context
				else {
	
					audio.src = src;
	
					if (isLoop === true) {
	
						// when audio ended, play again.
						audio.addEventListener('ended', function() {
							this.currentTime = 0;
							this.play();
						}, false);
					}
	
					self.play = play = function() {
	
						audio.play();
	
						return self;
					};
	
					self.stop = stop = function() {
						audio.pause();
					};
				}
			}
		}
	};
});
