TEST('DB', (ok) => {
	
	let logDB = TestBox.LOG_DB('testLog');
	
	logDB.log({
	    feeling : 'good',
	    weather : 'sunny'
	});
	
	DELAY(1, () => {
		
		logDB.find({
		    filter : {
		        feeling : 'good'
		    },
		    sort : {
		        time : -1
		    }
		}, (logs) => {
			console.log('검색된 로그 목록:', logs);
		});
	});
});
