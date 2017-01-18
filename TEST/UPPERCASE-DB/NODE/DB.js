TEST('DB', function(ok) {
	'use strict';
	
	var
	// db
	db = TestBox.DB('Test');
	
	// create data test
	db.create({
		msg : 'Hello, DB!',
		number : 12
	}, function(savedData) {

		console.log('데이터가 생성되었습니다.', savedData);
/*
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
			});
		});*/
	});
/*
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

	// aggregate test
	db.aggregate([{
		$sort : {
			count : 1
		}
	}, {
		$group : {
			_id : '$msg',
			highCount : {
				$first : '$count'
			}
		}
	}], function(result) {
		console.log('Aggregate success!', result);
	});*/
});
