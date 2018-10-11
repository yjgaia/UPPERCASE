/*!
audiocontext-polyfill.js v0.1.2
(c) 2013 - 2014 Shinnosuke Watanabe
Licensed under the MIT license
*/
'use strict';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

if (window.AudioContext !== undefined) {

	window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;

	let Proto = AudioContext.prototype;

	let tmpctx = new AudioContext();

	// Support alternate names
	// start (noteOn), stop (noteOff), createGain (createGainNode), etc.
	let isStillOld = (normative, old) => {
		return normative === undefined && old !== undefined;
	};

	let bufProto = tmpctx.createBufferSource().constructor.prototype;

	if (isStillOld(bufProto.start, bufProto.noteOn) || isStillOld(bufProto.stop, bufProto.noteOff)) {
		
		let nativeCreateBufferSource = Proto.createBufferSource;

		Proto.createBufferSource = function() {
			let returnNode = nativeCreateBufferSource.call(this);
			returnNode.start = returnNode.start || returnNode.noteOn;
			returnNode.stop = returnNode.stop || returnNode.noteOff;

			return returnNode;
		};
	}

	// Firefox 24 doesn't support OscilatorNode
	if (typeof tmpctx.createOscillator === 'function') {
		let oscProto = tmpctx.createOscillator().constructor.prototype;

		if (isStillOld(oscProto.start, oscProto.noteOn) ||
			isStillOld(oscProto.stop, oscProto.noteOff)) {
			let nativeCreateOscillator = Proto.createOscillator;

			Proto.createOscillator = function() {
				let returnNode = nativeCreateOscillator.call(this);
				returnNode.start = returnNode.start || returnNode.noteOn;
				returnNode.stop = returnNode.stop || returnNode.noteOff;

				return returnNode;
			};
		}
	}

	if (Proto.createGain === undefined && Proto.createGainNode !== undefined) {
		Proto.createGain = Proto.createGainNode;
	}

	if (Proto.createDelay === undefined && Proto.createDelayNode !== undefined) {
		Proto.createDelay = Proto.createGainNode;
	}

	if (Proto.createScriptProcessor === undefined &&
		Proto.createJavaScriptNode !== undefined) {
		Proto.createScriptProcessor = Proto.createJavaScriptNode;
	}

	// Black magic for iOS
	if (navigator.userAgent.indexOf('like Mac OS X') !== -1) {
		
		let OriginalAudioContext = AudioContext;
		
		window.AudioContext = function() {
			let iOSCtx = new OriginalAudioContext();

			let body = document.body;
			let tmpBuf = iOSCtx.createBufferSource();
			let tmpProc = iOSCtx.createScriptProcessor(256, 1, 1);
			
			let instantProcess = () => {
				tmpBuf.start(0);
				tmpBuf.connect(tmpProc);
				tmpProc.connect(iOSCtx.destination);
			};

			body.addEventListener('touchstart', instantProcess, false);

			// This function will be called once and for all.
			tmpProc.onaudioprocess = () => {
				tmpBuf.disconnect();
				tmpProc.disconnect();
				body.removeEventListener('touchstart', instantProcess, false);
				tmpProc.onaudioprocess = null;
			};

			return iOSCtx;
		};
	}
}