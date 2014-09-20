// load UPPERCASE.JS.
require('../../../UPPERCASE.JS-COMMON.js');
require('../../../UPPERCASE.JS-NODE.js');

// load UPPERCASE.IO-BOX.
require('../../../UPPERCASE.IO-BOX/CORE.js');

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
			count : 0
		}, function(savedData) {

			console.log('Create data successed!', savedData);

			// get data test
			db.get(savedData.id, function(savedData) {
				console.log('Get data successed!', savedData);
			});

			// check is exists data test
			db.checkIsExists(savedData.id, function(isExists) {
				console.log('Check is exists success!', isExists);
			});

			// get data test (using filter)
			db.get({
				filter : {
					msg : 'test'
				}
			}, function(savedData) {
				console.log('Get data using filter successed!', savedData);
			});

			REPEAT(5, function() {

				// get random data test
				db.get({
					isRandom : true
				}, function(savedData) {
					console.log('Get random data successed!', savedData);
				});
			});

			// update data test
			db.update({
				id : savedData.id,
				msg : 'test2',

				// increase count.
				$inc : {
					count : 1
				}
			}, function(savedData) {

				console.log('Update data successed!', savedData);

				// remove data test
				db.remove(savedData.id, function(savedData) {
					console.log('Remove data successed!', savedData);

					// get data again.
					db.get(savedData.id, function(savedData) {
						console.log('Get data again successed!', savedData);
					});

					// get data again.
					db.get({
						id : savedData.id,
						isIncludeRemoved : true
					}, function(savedData) {
						console.log('Get data again successed!', savedData);
					});
				});
			});
		});

		// find data set test
		db.find({
			filter : {
				msg : 'test'
			},
			sort : {
				createTime : -1
			},
			start : 10,
			count : 10 // max count is NODE_CONFIG.maxDataCount
		}, function(savedDataSet) {
			console.log('Find data set success!', savedDataSet);
		});

		// count data set test
		db.count({
			msg : 'test'
		}, function(count) {
			console.log('Count data set success!', count);
		});

		// check is exists test
		db.checkIsExists({
			msg : 'test'
		}, function(isExists) {
			console.log('Check is exists success!', isExists);
		});
	});
});
