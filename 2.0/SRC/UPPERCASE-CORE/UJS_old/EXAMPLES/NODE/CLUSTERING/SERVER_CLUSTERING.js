// load UJS.
require('../../../UJS-NODE.js');

TEST('SERVER_CLUSTERING', function(ok) {
	'use strict';

	INIT_OBJECTS();

	SERVER_CLUSTERING({
		hosts : {
			serverA : '127.0.0.1',
			serverB : '127.0.0.1'
		},
		thisServerName : 'serverA',
		port : 8125
	}, function() {

		SERVER_CLUSTERING.on('receive', function(data) {
			ok(CHECK_ARE_SAME([data, {
				msg : 'Hey!'
			}]));
		});

		DELAY(1, function() {

			SERVER_CLUSTERING.broadcast({
				methodName : 'receive',
				data : {
					msg : 'Hey!'
				}
			});
		});
	});
});
