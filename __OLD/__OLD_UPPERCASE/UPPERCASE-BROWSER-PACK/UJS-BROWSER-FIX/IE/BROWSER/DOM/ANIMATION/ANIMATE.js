OVERRIDE(ANIMATE, function(origin) {
	'use strict';

	/**
	 * animate node. (destroy for IE)
	 */
	global.ANIMATE = METHOD({

		run : function(params, callback) {
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
			duration = params.duration,

			// iteration count
			iterationCount = params.iterationCount === undefined ? '' : params.iterationCount;

			node.addStyle(keyframes.getFinalStyle());

			if (callback !== undefined && (iterationCount === '' || iterationCount === 1)) {

				DELAY(function() {
					callback(node);
				});
			}
		}
	});
});
