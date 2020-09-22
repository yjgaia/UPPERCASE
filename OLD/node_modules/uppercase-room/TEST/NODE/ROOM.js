TEST('ROOM', (check) => {
	
	TestBox.ROOM('testRoom', (clientInfo, on, off, send, broadcastExceptMe) => {

		on('msg', (data, ret) => {

			console.log(data);
			
			// ignore undefined data attack.
			if (data !== undefined) {

				TestBox.BROADCAST({
					roomName : 'testRoom',
					methodName : 'msg',
					data : {
						result : 'good!',
						test : new Date()
					}
				});

				ret({
					result : 'good!'
				});
			}
		});
	});
});
