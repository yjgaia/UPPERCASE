TEST('CONNECT_TO_DB_SERVER', (ok) => {
	
	CONNECT_TO_DB_SERVER({
		host : '127.0.0.1',
		port : 27017,
		name : 'Test'
	}, () => {
		console.log('MongoDB 서버에 접속되었습니다.');
	});
});
