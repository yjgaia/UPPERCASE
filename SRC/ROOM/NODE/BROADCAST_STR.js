FOR_BOX(function(box) {
	'use strict';

	/**
	 * broadcast string to rooms.
	 */
	box.BROADCAST_STR = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//OPTIONAL: params.str

			var
			// room name
			roomName = box.boxName + '/' + params.roomName,
			
			// str
			str = params.str;

			LAUNCH_ROOM_SERVER.broadcast({
				roomName : roomName,
				str : str
			});

			if (CPU_CLUSTERING.broadcast !== undefined) {

				CPU_CLUSTERING.broadcast({
					methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
					data : {
						roomName : roomName,
						str : str
					}
				});
			}

			if (SERVER_CLUSTERING.broadcast !== undefined) {

				SERVER_CLUSTERING.broadcast({
					methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
					data : {
						roomName : roomName,
						str : str
					}
				});
			}
		}
	});
});
