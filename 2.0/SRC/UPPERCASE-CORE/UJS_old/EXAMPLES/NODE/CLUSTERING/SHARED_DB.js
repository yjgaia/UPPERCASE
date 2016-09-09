// load UJS.
require('../../../UJS-NODE.js');

TEST('SHARED_DB', function(ok) {
	'use strict';
	
	BOX('TestBox');

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		SERVER_CLUSTERING({
			hosts : {
				serverA : '127.0.0.1',
				serverB : '127.0.0.1'
			},
			thisServerName : 'serverA',
			port : 8125
		}, function() {

			var
			// shared db
			sharedDB = TestBox.CPU_SHARED_DB('test');

			if (CPU_CLUSTERING.getWorkerId() === 1) {

				sharedDB.save({
					id : '1234',
					data : {
						msg : 'Hello World!'
					},
					removeAfterSeconds : 2
				});
			}

			DELAY(1, function() {
				
				ok(sharedDB.get('1234').msg === 'Hello World!');
				
				ok(CHECK_ARE_SAME([sharedDB.list(), {
					'1234' : {
						msg : 'Hello World!'
					}
				}]));
			});

			DELAY(3, function() {
				ok(sharedDB.get('1234') === undefined);
			});
		});
	});
});
