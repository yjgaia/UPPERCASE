// load UJS.
require('../../../UJS-NODE.js');

// load UPPERCASE-DB.
require('../../../UPPERCASE-DB/NODE.js');

// load UPPERCASE-TRANSPORT.
require('../../../UPPERCASE-TRANSPORT/NODE.js');

// load UPPERCASE-ROOM.
require('../../../UPPERCASE-ROOM/NODE.js');

// load UPPERCASE-MODEL.
require('../../../UPPERCASE-MODEL/NODE.js');

TEST('MODEL', function(ok) {
	'use strict';

	CPU_CLUSTERING(function(workerData) {

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

		NODE_CONFIG.isDBLogMode = true;

		CONNECT_TO_DB_SERVER({
			name : 'test'
		});

		BOX('TestBox');

		// Example Model
		TestBox.TestModel = OBJECT({

			preset : function() {
				return TestBox.MODEL;
			},

			params : function() {

				var
				// valid data set
				validDataSet;

				validDataSet = {
					name : {
						notEmpty : true,
						size : {
							min : 0,
							max : 255
						}
					},
					age : {
						notEmpty : true,
						integer : true
					},
					isMan : {
						bool : true
					}
				};

				return {
					name : 'Test',
					methodConfig : {
						create : {
							valid : VALID(validDataSet)
						},
						update : {
							valid : VALID(validDataSet)
						},
						remove : {
							//role : 'Test'
						}
					}
				};
			}
		});

		INIT_OBJECTS();
	});
});
