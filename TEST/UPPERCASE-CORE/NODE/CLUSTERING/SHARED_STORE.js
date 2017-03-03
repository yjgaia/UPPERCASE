TEST('SHARED_STORE', (check) => {
	
	CPU_CLUSTERING(() => {
		
		SERVER_CLUSTERING({
			hosts : {
				serverA : '127.0.0.1',
				serverB : '127.0.0.1'
			},
			thisServerName : 'serverA',
			port : 8125
		}, () => {
			
			let sharedStore = TestBox.SHARED_STORE('test');
	
			if (CPU_CLUSTERING.getWorkerId() === 1) {
	
				sharedStore.save({
					id : '1234',
					data : {
						msg : 'Hello World!'
					}
				}, (savedData) => {
					console.log('데이터 저장 완료', savedData);
				});
		
				DELAY(1, () => {
					
					sharedStore.get('1234', (savedData) => {
						check(savedData.msg === 'Hello World!');
					});
					
					sharedStore.all((savedDataSet) => {
						check(CHECK_ARE_SAME([savedDataSet, {
							'1234' : {
								msg : 'Hello World!'
							}
						}]));
					});
				});
				
				// update.
				DELAY(2, () => {
					
					sharedStore.update({
						id : '1234',
						data : {
							number : 1
						}
					}, (savedData) => {
						console.log('데이터 수정 완료', savedData);
					});
				});
				
				DELAY(3, () => {
					
					sharedStore.get('1234', (savedData) => {
						check(savedData.msg === 'Hello World!' && savedData.number === 1);
					});
					
					sharedStore.all((savedDataSet) => {
						check(CHECK_ARE_SAME([savedDataSet, {
							'1234' : {
								msg : 'Hello World!',
								number : 1
							}
						}]));
					});
				});
				
				// $inc
				DELAY(4, () => {
					
					sharedStore.update({
						id : '1234',
						data : {
							array : [1],
							$inc : {
								number : 3
							}
						}
					}, (savedData) => {
						console.log('데이터 수정 완료', savedData);
					});
				});
				
				DELAY(5, () => {
					
					sharedStore.get('1234', (savedData) => {
						check(savedData.msg === 'Hello World!' && savedData.number === 4);
					});
					
					sharedStore.all((savedDataSet) => {
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
				DELAY(6, () => {
					
					sharedStore.update({
						id : '1234',
						data : {
							$push : {
								array : 2
							}
						}
					}, (savedData) => {
						console.log('데이터 수정 완료', savedData);
					});
				});
				
				DELAY(7, () => {
					
					sharedStore.all((savedDataSet) => {
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
				DELAY(8, () => {
					
					sharedStore.update({
						id : '1234',
						data : {
							$addToSet : {
								array : 1
							}
						}
					}, (savedData) => {
						console.log('데이터 수정 완료', savedData);
					});
				});
				
				DELAY(9, () => {
					
					sharedStore.all((savedDataSet) => {
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
				DELAY(10, () => {
					
					sharedStore.update({
						id : '1234',
						data : {
							$pull : {
								array : 1
							}
						}
					}, (savedData) => {
						console.log('데이터 수정 완료', savedData);
					});
				});
				
				DELAY(11, () => {
					
					sharedStore.all((savedDataSet) => {
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
});
