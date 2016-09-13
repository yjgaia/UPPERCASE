TEST('CONNECT_TO_ROOM_SERVER', function(ok) {
	'use strict';

	var
	// room
	room1 = TestBox.CLIENT_ROOM('testRoom'),

	// room2
	room2 = TestBox.CLIENT_ROOM('testRoom');

	CONNECT_TO_ROOM_SERVER({
		host : '127.0.0.1',
		port : 9127
	}, function() {

		var
		// room
		room3 = TestBox.CLIENT_ROOM('testRoom'),

		// room2
		room4 = TestBox.CLIENT_ROOM('testRoom');

		room3.on('msg', function(data) {
			console.log(3, data);
		});

		room4.on('msg', function(data) {
			console.log(4, data);
		});

		DELAY(0.3, function() {

			room2.exit();

			room4.send({
				methodName : 'msg',
				data : {
					test2 : 'Hello, Test2!',
					date : new Date()
				}
			}, function(result) {
				console.log(result);
			});
		});
	});

	room1.on('msg', function(data) {
		console.log(1, data);
	});

	room2.on('msg', function(data) {
		console.log(2, data);
	});
});
