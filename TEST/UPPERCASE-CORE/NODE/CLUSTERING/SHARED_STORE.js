TEST('SHARED_STORE', function(check) {
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
			}, function(savedData) {
				console.log('데이터 저장 완료', savedData);
			});
	
			DELAY(1, function() {
				
				sharedStore.get('1234', function(savedData) {
					check(savedData.msg === 'Hello World!');
				});
				
				sharedStore.all(function(savedDataSet) {
					check(CHECK_ARE_SAME([savedDataSet, {
						'1234' : {
							msg : 'Hello World!'
						}
					}]));
				});
			});
			
			// update.
			DELAY(2, function() {
				
				sharedStore.update({
					id : '1234',
					data : {
						number : 1
					}
				}, function(savedData) {
					console.log('데이터 수정 완료', savedData);
				});
			});
			
			DELAY(3, function() {
				
				sharedStore.get('1234', function(savedData) {
					check(savedData.msg === 'Hello World!' && savedData.number === 1);
				});
				
				sharedStore.all(function(savedDataSet) {
					check(CHECK_ARE_SAME([savedDataSet, {
						'1234' : {
							msg : 'Hello World!',
							number : 1
						}
					}]));
				});
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
				}, function(savedData) {
					console.log('데이터 수정 완료', savedData);
				});
			});
			
			DELAY(5, function() {
				
				sharedStore.get('1234', function(savedData) {
					check(savedData.msg === 'Hello World!' && savedData.number === 4);
				});
				
				sharedStore.all(function(savedDataSet) {
					check(CHECK_ARE_SAME([savedDataSet, {
						'1234' : {
							msg : 'Hello World!',
							array : [1],
							number : 4
						}
					}]));
				});
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
				}, function(savedData) {
					console.log('데이터 수정 완료', savedData);
				});
			});
			
			DELAY(7, function() {
				
				sharedStore.all(function(savedDataSet) {
					check(CHECK_ARE_SAME([savedDataSet, {
						'1234' : {
							msg : 'Hello World!',
							array : [1, 2],
							number : 4
						}
					}]));
				});
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
				}, function(savedData) {
					console.log('데이터 수정 완료', savedData);
				});
			});
			
			DELAY(9, function() {
				
				sharedStore.all(function(savedDataSet) {
					check(CHECK_ARE_SAME([savedDataSet, {
						'1234' : {
							msg : 'Hello World!',
							array : [1, 2],
							number : 4
						}
					}]));
				});
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
				}, function(savedData) {
					console.log('데이터 수정 완료', savedData);
				});
			});
			
			DELAY(11, function() {
				
				sharedStore.all(function(savedDataSet) {
					check(CHECK_ARE_SAME([savedDataSet, {
						'1234' : {
							msg : 'Hello World!',
							array : [2],
							number : 4
						}
					}]));
				});
			});	
		}
	});
});
