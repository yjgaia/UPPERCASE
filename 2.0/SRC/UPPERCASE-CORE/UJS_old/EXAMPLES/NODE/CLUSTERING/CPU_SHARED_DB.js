// load UJS.
require('../../../UJS-NODE.js');

TEST('CPU_SHARED_DB', function(ok) {
	'use strict';
	
	BOX('TestBox');

	INIT_OBJECTS();

	CPU_CLUSTERING(function() {

		var
		// shared db
		sharedDB = TestBox.CPU_SHARED_DB('test');

		if (CPU_CLUSTERING.getWorkerId() === 1) {

			sharedDB.save({
				id : '1234',
				data : {
					msg : 'Hello World!'
				}
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
		
		// update.
		DELAY(2, function() {
			
			sharedDB.update({
				id : '1234',
				data : {
					number : 1
				}
			});
		});
		
		DELAY(3, function() {
			
			ok(sharedDB.get('1234').msg === 'Hello World!' && sharedDB.get('1234').number === 1);
			
			ok(CHECK_ARE_SAME([sharedDB.list(), {
				'1234' : {
					msg : 'Hello World!',
					number : 1
				}
			}]));
		});
		
		// $inc
		DELAY(4, function() {
			
			sharedDB.update({
				id : '1234',
				data : {
					array : [1],
					$inc : {
						number : 3
					}
				}
			});
		});
		
		DELAY(5, function() {
			
			ok(sharedDB.get('1234').msg === 'Hello World!' && sharedDB.get('1234').number === 4);
			
			ok(CHECK_ARE_SAME([sharedDB.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [1],
					number : 4
				}
			}]));
		});
		
		// $push
		DELAY(6, function() {
			
			sharedDB.update({
				id : '1234',
				data : {
					$push : {
						array : 2
					}
				}
			});
		});
		
		DELAY(7, function() {
			
			ok(CHECK_ARE_SAME([sharedDB.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [1, 2],
					number : 4
				}
			}]));
		});
		
		// $addToSet
		DELAY(8, function() {
			
			sharedDB.update({
				id : '1234',
				data : {
					$addToSet : {
						array : 1
					}
				}
			});
		});
		
		DELAY(9, function() {
			
			ok(CHECK_ARE_SAME([sharedDB.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [1, 2],
					number : 4
				}
			}]));
		});
		
		// $pull
		DELAY(10, function() {
			
			sharedDB.update({
				id : '1234',
				data : {
					$pull : {
						array : 1
					}
				}
			});
		});
		
		DELAY(11, function() {
			
			ok(CHECK_ARE_SAME([sharedDB.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [2],
					number : 4
				}
			}]));
		});
	});
});
