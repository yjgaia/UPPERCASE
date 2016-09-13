FOR_BOX(function(box) {
	'use strict';

	/**
	 * broadcast to rooms.
	 */
	box.BROADCAST = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//OPTIONAL: params.methodName
			//OPTIONAL: params.data
			//OPTIONAL: params.str

			var
			// room name
			roomName = box.boxName + '/' + params.roomName,

			// method name
			methodName = params.methodName,

			// data
			data = params.data,

			// str
			str = params.str;
			
			if (str !== undefined) {
				
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
			
			else {
				
				LAUNCH_ROOM_SERVER.broadcast({
					roomName : roomName,
					methodName : methodName,
					data : data
				});
	
				if (CPU_CLUSTERING.broadcast !== undefined) {
	
					CPU_CLUSTERING.broadcast({
						methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
						data : {
							roomName : roomName,
							methodName : methodName,
							data : data
						}
					});
				}
	
				if (SERVER_CLUSTERING.broadcast !== undefined) {
	
					SERVER_CLUSTERING.broadcast({
						methodName : '__LAUNCH_ROOM_SERVER__MESSAGE',
						data : {
							roomName : roomName,
							methodName : methodName,
							data : data
						}
					});
				}
			}
		}
	});
});
