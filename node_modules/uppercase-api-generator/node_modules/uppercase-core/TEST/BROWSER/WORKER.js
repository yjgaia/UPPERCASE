TEST('WORKER', (check) => {
	
	let worker = WORKER('UPPERCASE-CORE/BROWSER/test-worker.js');

	worker.on('message', (data, ret) => {

		console.log('CLIENT!', data);

		ret('Thanks!');
	});

	worker.send({
		methodName : 'message',
		data : {
			msg : 'message from client.'
		}
	}, (retMsg) => {

		console.log('RETURN MESSAGE:', retMsg);
	});

	worker.send({
		methodName : 'login',
		data : {
			username : 'test',
			password : '1234'
		}
	});

	DELAY(1, () => {

		worker.send({
			methodName : 'checkRole',
			data : 'USER'
		});
	});
});
