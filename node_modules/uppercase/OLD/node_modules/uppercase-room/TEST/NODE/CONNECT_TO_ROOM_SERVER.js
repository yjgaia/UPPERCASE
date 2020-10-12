TEST('CONNECT_TO_ROOM_SERVER', (check) => {

	let room1 = TestBox.CLIENT_ROOM('testRoom');
	let room2 = TestBox.CLIENT_ROOM('testRoom');

	CONNECT_TO_ROOM_SERVER({
		host : '127.0.0.1',
		port : 9126
	}, () => {

		let room3 = TestBox.CLIENT_ROOM('testRoom');
		let room4 = TestBox.CLIENT_ROOM('testRoom');

		room3.on('msg', (data) => {
			console.log(3, data);
		});

		room4.on('msg', (data) => {
			console.log(4, data);
		});

		DELAY(0.3, () => {

			room2.exit();

			room4.send({
				methodName : 'msg',
				data : {
					test2 : 'Hello, Test2!',
					date : new Date()
				}
			}, (result) => {
				console.log(result);
			});
		});
	});

	room1.on('msg', (data) => {
		console.log(1, data);
	});

	room2.on('msg', (data) => {
		console.log(2, data);
	});
});
