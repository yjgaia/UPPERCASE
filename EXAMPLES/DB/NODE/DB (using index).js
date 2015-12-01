// load UJS.
require('../../../UJS-COMMON.js');
require('../../../UJS-NODE.js');

// load UPPERCASE-DB.
require('../../../UPPERCASE-DB/NODE.js');

TEST('DB', function(ok) {
	'use strict';

	BOX('TestBox');

	INIT_OBJECTS();

	CONNECT_TO_DB_SERVER({
		name : 'test'
	}, function() {

		var
		// db
		db = TestBox.DB('test');
		
		// create index test
		db.createIndex({
			test : 1
		}, function() {
		
			db.findAllIndexes(function(indexes) {
				console.log(indexes);
			});
		});
	});
});
