// load UJS.
require('../../../../UJS-NODE.js');

TEST('SERVER_CLUSTERING', function(ok) {
	'use strict';

	INIT_OBJECTS();

	SERVER_CLUSTERING({
		hosts : {
			serverA : '1.btncafe.com',
			serverB : '2.btncafe.com'
		},
		thisServerName : 'serverA',
		port : 9125
	}, function() {

		SERVER_CLUSTERING.on('receive', function(data) {
			console.log('SERVER_CLUSTERING received: ', data);
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
