TEST('DB', (ok) => {
	
	let db = TestBox.DB('Test');
	
	// create data test
	db.create({
		msg : 'Hello, DB!',
		number : 12
	}, (savedData) => {

		console.log('데이터가 생성되었습니다.', savedData);
/*
		// get data test
		db.get(savedData.id, (savedData) => {
			console.log('Get data successed!', savedData);
		});

		// check is exists data test
		db.checkIsExists(savedData.id, (isExists) => {
			console.log('Check is exists success!', isExists);
		});

		// get data test (using filter)
		db.get({
			filter : {
				msg : 'test'
			}
		}, (savedData) => {
			console.log('Get data using filter successed!', savedData);
		});

		REPEAT(5, () => {

			// get random data test
			db.get({
				isRandom : true
			}, (savedData) => {
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
		}, (savedData) => {

			console.log('Update data successed!', savedData);

			// remove data test
			db.remove(savedData.id, (savedData) => {
				console.log('Remove data successed!', savedData);

				// get data again.
				db.get(savedData.id, (savedData) => {
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
	}, (savedDataSet) => {
		console.log('Find data set success!', savedDataSet);
	});

	// count data set test
	db.count({
		msg : 'test'
	}, (count) => {
		console.log('Count data set success!', count);
	});

	// check is exists test
	db.checkIsExists({
		msg : 'test'
	}, (isExists) => {
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
	}], (result) => {
		console.log('Aggregate success!', result);
	});*/
	
	db.createIndex({
	    msg : 1
	});
	
	db.removeIndex({
	    msg : 1
	});
	
	db.findAllIndexes((indexes) => {
		console.log('인덱스 목록:', indexes);
	});
	
	
	/*
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
	 */
	
	/*db.findAllAndUpdateNoHistory({
		filter : {
			number : 12
		},
		data : {
			"msg" : "Hello, findAllAndUpdateNoHistory!"
		}
	}, () => {
		console.log('여러 데이터 수정 완료');
	});*/
});
