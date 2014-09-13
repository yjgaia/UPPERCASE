FOR_BOX(function(box) {
	'use strict';

	OVERRIDE(box.ROOM, function(origin) {

		/**
		 * Connection room class
		 */
		box.ROOM = CLASS({

			preset : function() {
				return origin;
			},

			init : function(inner, self, name) {
				//REQUIRED: name

				var
				// send.
				send;

				//OVERRIDE: self.send
				self.send = send = function(params, callback) {
					//REQUIRED: params
					//REQUIRED: params.methodName
					//REQUIRED: params.data
					//OPTIONAL: params.isNotUsingLoadingBar
					//OPTIONAL: callback

					if (inner.checkIsExited() !== true) {

						CONNECT_TO_ROOM_SERVER.send({
							methodName : inner.getRoomName() + '/' + params.methodName,
							data : params.data,
							isNotUsingLoadingBar : params.isNotUsingLoadingBar
						}, callback);

					} else {
						console.log(CONSOLE_RED('[UPPERCASE.IO-ROOM] `ROOM.send` ERROR! ROOM EXITED!'));
					}
				};
			}
		});
	});
});
