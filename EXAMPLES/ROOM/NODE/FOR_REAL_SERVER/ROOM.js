// load UPPERCASE.JS.
require('../../../../UPPERCASE.JS-COMMON.js');
require('../../../../UPPERCASE.JS-NODE.js');

CPU_CLUSTERING(function(workerData) {

	SERVER_CLUSTERING({
		hosts : ['1.226.84.92', '58.229.105.35'],
		port : 9125
	});

	// load UPPERCASE.IO-BOX.
	require('../../../../UPPERCASE.IO-BOX/CORE.js');

	BOX('TestBox');

	// load UPPERCASE.IO-TRANSPORT.
	require('../../../../UPPERCASE.IO-TRANSPORT/NODE.js');

	// load UPPERCASE.IO-ROOM.
	require('../../../../UPPERCASE.IO-ROOM/NODE.js');

	var
	// web socket fix request
	webSocketFixRequest,

	// web server
	webServer = WEB_SERVER(9127, function(requestInfo, response, onDisconnected) {

		// serve web socket fix request
		if (requestInfo.uri === '__WEB_SOCKET_FIX') {

			webSocketFixRequest(requestInfo, {
				response : response,
				onDisconnected : onDisconnected
			});
		}
	});

	webSocketFixRequest = LAUNCH_ROOM_SERVER({
		socketServerPort : 9126,
		webServer : webServer,
		isCreateWebSocketFixRequestManager : true
	}).getWebSocketFixRequest();

	TestBox.ROOM('testRoom', function(clientInfo, on, off) {

		on('msg', function(data, ret) {

			console.log(data);

			TestBox.BROADCAST({
				roomName : 'testRoom',
				methodName : 'msg',
				data : {
					result : 'good!',
					test : new Date()
				}
			});

			ret({
				result : 'good!'
			});
		});
	});

	INIT_OBJECTS();
});
