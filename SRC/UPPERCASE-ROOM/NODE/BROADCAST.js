FOR_BOX(function(box) {
	'use strict';

	/**
	 * 주어진 이름을 가진 모든 룸에 데이터를 전송합니다.
	 */
	box.BROADCAST = METHOD({

		run : function(params) {
			//REQUIRED: params
			//REQUIRED: params.roomName
			//OPTIONAL: params.methodName
			//OPTIONAL: params.data

			var
			// room name
			roomName = box.boxName + '/' + params.roomName,

			// method name
			methodName = params.methodName,

			// data
			data = params.data;
			
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
	});
});
