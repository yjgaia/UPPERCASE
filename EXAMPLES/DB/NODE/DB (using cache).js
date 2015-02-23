// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-BOX.
require('../../../UPPERCASE.IO-BOX/CORE.js');
require('../../../UPPERCASE.IO-BOX/NODE.js');

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
		
		// find data cahced
		db.find({
			filter : {
				msg : 'test'
			},
			isToCache : true
		}, function(savedData) {
			console.log('Find cached data successed!', savedData);
		});
		
		// create data test
		db.create({
			msg : 'test',
			count : 0
		}, function(savedData) {
			
			console.log('Create data successed!', savedData);
			
			// find data cahced
			db.find({
				filter : {
					msg : 'test'
				},
				isToCache : true
			}, function(savedData) {
				console.log('Find cached data successed!', savedData);
			});
		});
	});
});
