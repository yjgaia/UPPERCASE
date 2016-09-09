/**
 * animate node.
 */
global.ANIMATE = METHOD({

	run : function(params, callback) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.node
		//REQUIRED: params.keyframes
		//OPTIONAL: params.duration
		//OPTIONAL: params.timingFunction
		//OPTIONAL: params.delay
		//OPTIONAL: params.iterationCount
		//OPTIONAL: params.direction
		//OPTIONAL: params.playState
		//OPTIONAL: callback

		var
		// node
		node = params.node,

		// keyframes
		keyframes = params.keyframes,

		// duration
		duration = params.duration === undefined ? 0.5 : params.duration,

		// timing function
		timingFunction = params.timingFunction === undefined ? '' : params.timingFunction,

		// delay
		delay = params.delay === undefined ? '' : params.delay,

		// iteration count
		iterationCount = params.iterationCount === undefined ? '' : params.iterationCount,

		// direction
		direction = params.direction === undefined ? '' : params.direction,

		// play state
		playState = params.playState === undefined ? '' : params.playState,

		// str
		str = keyframes.getName() + ' ' + duration + 's ' + timingFunction + ' ' + delay + ' ' + iterationCount + ' ' + direction + ' ' + playState;

		node.addStyle(keyframes.getStartStyle());

		node.addStyle({
			animation : str
		});

		node.addStyle(keyframes.getFinalStyle());

		if (callback !== undefined && (iterationCount === '' || iterationCount === 1)) {

			DELAY(duration, function() {
				callback(node);
			});
		}
	}
});

