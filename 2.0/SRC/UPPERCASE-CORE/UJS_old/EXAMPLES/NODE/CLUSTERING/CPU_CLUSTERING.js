// load UJS.
require('../../../UJS-NODE.js');

TEST('CPU_CLUSTERING', function(ok) {
	'use strict';

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		console.log('WORK, WORKER!: ', CPU_CLUSTERING.getWorkerId());

		CPU_CLUSTERING.on('receive', function(data) {
			ok(CHECK_ARE_SAME([data, {
				msg : 'Hey!'
			}]));
		});

		if (CPU_CLUSTERING.getWorkerId() === 1) {

			CPU_CLUSTERING.broadcast({
				methodName : 'receive',
				data : {
					msg : 'Hey!'
				}
			});
		}
	});
});
