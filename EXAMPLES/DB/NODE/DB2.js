// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-DB.
require('../../../UPPERCASE.IO-DB/NODE.js');

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
		
		// create data test
		db.create({
			msg : 'test',
			array : []
		}, function(savedData) {

			console.log('Create data successed!', savedData);

			// update data test
			db.update({
				id : savedData.id,
				msg : 'test2',

				// push 3 to array.
				$push : {
					array : 3
				}
			}, function(savedData) {
				
				console.log('Update data successed!', savedData);
				
				// update data test
				db.update({
					id : savedData.id,
					msg : 'test2',
	
					// pull 3 from array.
					$pull : {
						array : 3
					}
				}, function(savedData) {
					
					console.log('Update data successed!', savedData);
				});
			});
		});
	});
});
