/*
 * 사운드 파일을 재생하는 SOUND 클래스
 */
global.SOUND = CLASS((cls) => {

	let audioContext;
	let isCanPlayOGG = new Audio().canPlayType('audio/ogg') !== '';
	
	let bufferCache = {};
	
	let loadBuffer = (src, callback) => {
		
		if (bufferCache[src] !== undefined) {
			callback(bufferCache[src]);
		}
		
		else {
			
			let request = new XMLHttpRequest();
			request.open('GET', src, true);
			request.responseType = 'arraybuffer';
			
			request.onload = () => {
				
				audioContext.decodeAudioData(request.response, (buffer) => {
					
					bufferCache[src] = buffer;
					
					callback(buffer);
				});
			};
			
			request.send();
		}
	};

	return {

		init : (inner, self, params, onEndHandler) => {
			//REQUIRED: params
			//OPTIONAL: params.ogg
			//OPTIONAL: params.mp3
			//OPTIONAL: params.wav
			//OPTIONAL: params.isLoop
			//OPTIONAL: params.volume
			//OPTIONAL: onEndHandler

			let ogg = params.ogg;
			let mp3 = params.mp3;
			let wav = params.wav;
			let isLoop = params.isLoop;
			let volume = params.volume;
			
			if (volume === undefined) {
				volume = 0.8;
			}
			
			let buffer;
			let source;
			let gainNode;
			
			let isLoaded = false;
			
			let startedAt = 0;
			let pausedAt = 0;
			
			let duration;
			let isPlaying = false;
			
			let delayed;
			
			let fadeInSeconds;
			
			let eventMap = {};
			
			// init audioContext.
			if (audioContext === undefined) {
				audioContext = new AudioContext();
			}
			
			let src;
			if (ogg !== undefined && isCanPlayOGG === true) {
				src = ogg;
			} else if (mp3 !== undefined) {
				src = mp3;
			} else {
				src = wav;
			}
			
			let ready = () => {
				
				loadBuffer(src, (_buffer) => {
					
					if (buffer === undefined) {
						
						gainNode = audioContext.createGain();
	
						buffer = _buffer;
						
						duration = buffer.duration;
						
						gainNode.connect(audioContext.destination);
						
						if (fadeInSeconds === undefined) {
							gainNode.gain.setValueAtTime(volume, 0);
						} else {
							gainNode.gain.setValueAtTime(0, 0);
							gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + fadeInSeconds);
							fadeInSeconds = undefined;
						}
	
						if (delayed !== undefined) {
							delayed();
						}
						
						fireEvent('load');
						off('load');
						
						isLoaded = true;
					}
				});
			};

			let play = self.play = (at) => {
				//OPTIONAL: at
				
				if (isPlaying !== true) {
					
					if (at !== undefined) {
						pausedAt = at;
					}
	
					delayed = () => {
						
						if (isPlaying !== true) {
							
							source = audioContext.createBufferSource();
							source.buffer = buffer;
							source.connect(gainNode);
							source.loop = isLoop;
							
							startedAt = Date.now() / 1000 - pausedAt;
							source.start(0, pausedAt % buffer.duration);
							
							delayed = undefined;
							
							if (isLoop !== true) {
								source.onended = () => {
									stop();
									if (onEndHandler !== undefined) {
										onEndHandler();
									}
								};
							}
							
							isPlaying = true;
						}
					};
	
					if (buffer === undefined) {
						ready();
					} else {
						delayed();
					}
				}

				return self;
			};
			
			let checkIsPlaying = self.checkIsPlaying = () => {
				return isPlaying;
			};
			
			let getStartAt = self.getStartAt = () => {
				return startedAt;
			};
			
			let pause = self.pause = () => {
				
				if (source !== undefined) {
					source.stop(0);
					source.disconnect();
					source = undefined;
					
					pausedAt = Date.now() / 1000 - startedAt;
				}
				
				delayed = undefined;
				
				isPlaying = false;
			};

			let stop = self.stop = () => {
				
				if (source !== undefined) {
					source.stop(0);
					source.disconnect();
					source = undefined;
					
					pausedAt = 0;
				}
				
				if (gainNode !== undefined) {
					gainNode.disconnect();
					gainNode = undefined;
				}
				
				buffer = undefined;
				delayed = undefined;
				
				isPlaying = false;
			};
			
			let setVolume = self.setVolume = (_volume) => {
				//REQUIRED: volume
				
				volume = _volume;
				
				if (gainNode !== undefined) {
					gainNode.gain.setValueAtTime(volume, 0);
				}
			};
			
			let getVolume = self.getVolume = () => {
				return volume;
			};
			
			let setPlaybackRate = self.setPlaybackRate = (playbackRate) => {
				//REQUIRED: playbackRate
				
				if (source !== undefined) {
					source.playbackRate.setValueAtTime(playbackRate, 0);
				}
			};
			
			let fadeIn = self.fadeIn = (seconds) => {
				//REQUIRED: seconds
				
				if (gainNode !== undefined) {
					gainNode.gain.setValueAtTime(0, 0);
					gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + seconds);
				}
				
				else {
					fadeInSeconds = seconds;
				}
				
				play();
			};
			
			let fadeOut = self.fadeOut = (seconds) => {
				//REQUIRED: seconds
				
				if (gainNode !== undefined) {
					gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + seconds);
				}
				
				DELAY(seconds, () => {
					stop();
				});
			};
			
			let getDuration = self.getDuration = () => {
				return duration;
			};
			
			let on = self.on = (eventName, eventHandler) => {
				//REQUIRED: eventName
				//REQUIRED: eventHandler
				
				if (eventMap[eventName] === undefined) {
					eventMap[eventName] = [];
				}
	
				eventMap[eventName].push(eventHandler);
				
				if (eventName === 'load' && isLoaded === true) {
					fireEvent('load');
					off('load');
				}
			};
			
			let checkIsEventExists = self.checkIsEventExists = (eventName) => {
				//REQUIRED: eventName
				
				return eventMap[eventName] !== undefined;
			};
	
			let off = self.off = (eventName, eventHandler) => {
				//REQUIRED: eventName
				//OPTIONAL: eventHandler
	
				if (eventMap[eventName] !== undefined) {
	
					if (eventHandler !== undefined) {
	
						REMOVE({
							array: eventMap[eventName],
							value: eventHandler
						});
					}
	
					if (eventHandler === undefined || eventMap[eventName].length === 0) {
						delete eventMap[eventName];
					}
				}
			};
	
			let fireEvent = self.fireEvent = (eventNameOrParams) => {
				//REQUIRED: eventNameOrParams
				//REQUIRED: eventNameOrParams.eventName
				//OPTIONAL: eventNameOrParams.e
				
				let eventName;
				let e;
				
				if (CHECK_IS_DATA(eventNameOrParams) !== true) {
					eventName = eventNameOrParams;
				} else {
					eventName = eventNameOrParams.eventName;
					e = eventNameOrParams.e;
				}
				
				let eventHandlers = eventMap[eventName];
	
				if (eventHandlers !== undefined) {
					
					for (let i = 0; i < eventHandlers.length; i += 1) {
						eventHandlers[i](e === undefined ? EMPTY_E() : e, self);
					}
				}
			};
			
			ready();
		}
	};
});
