TEST('SHARED_STORE', function(ok) {
	'use strict';
	
	CPU_CLUSTERING(function() {

		var
		// shared store
		sharedStore = TestBox.SHARED_STORE('test');

		if (CPU_CLUSTERING.getWorkerId() === 1) {

			sharedStore.save({
				id : '1234',
				data : {
					msg : 'Hello World!'
				}
			});
		}

		DELAY(1, function() {
			
			ok(sharedStore.get('1234').msg === 'Hello World!');
			
			ok(CHECK_ARE_SAME([sharedStore.list(), {
				'1234' : {
					msg : 'Hello World!'
				}
			}]));
		});
		
		// update.
		DELAY(2, function() {
			
			sharedStore.update({
				id : '1234',
				data : {
					number : 1
				}
			});
		});
		
		DELAY(3, function() {
			
			ok(sharedStore.get('1234').msg === 'Hello World!' && sharedStore.get('1234').number === 1);
			
			ok(CHECK_ARE_SAME([sharedStore.list(), {
				'1234' : {
					msg : 'Hello World!',
					number : 1
				}
			}]));
		});
		
		// $inc
		DELAY(4, function() {
			
			sharedStore.update({
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
			
			ok(sharedStore.get('1234').msg === 'Hello World!' && sharedStore.get('1234').number === 4);
			
			ok(CHECK_ARE_SAME([sharedStore.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [1],
					number : 4
				}
			}]));
		});
		
		// $push
		DELAY(6, function() {
			
			sharedStore.update({
				id : '1234',
				data : {
					$push : {
						array : 2
					}
				}
			});
		});
		
		DELAY(7, function() {
			
			ok(CHECK_ARE_SAME([sharedStore.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [1, 2],
					number : 4
				}
			}]));
		});
		
		// $addToSet
		DELAY(8, function() {
			
			sharedStore.update({
				id : '1234',
				data : {
					$addToSet : {
						array : 1
					}
				}
			});
		});
		
		DELAY(9, function() {
			
			ok(CHECK_ARE_SAME([sharedStore.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [1, 2],
					number : 4
				}
			}]));
		});
		
		// $pull
		DELAY(10, function() {
			
			sharedStore.update({
				id : '1234',
				data : {
					$pull : {
						array : 1
					}
				}
			});
		});
		
		DELAY(11, function() {
			
			ok(CHECK_ARE_SAME([sharedStore.list(), {
				'1234' : {
					msg : 'Hello World!',
					array : [2],
					number : 4
				}
			}]));
		});
	});
});
