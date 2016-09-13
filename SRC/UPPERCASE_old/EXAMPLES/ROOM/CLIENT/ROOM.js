TEST('ROOM', function(ok) {
	'use strict';

	var
	// room
	room1 = TestBox.ROOM('testRoom'),

	// room2
	room2 = TestBox.ROOM('testRoom');

	CONNECT_TO_ROOM_SERVER({
		port : 9127,
		fixRequestURI : '__WEB_SOCKET_FIX'
	}, function() {

		var
		// room
		room3 = TestBox.ROOM('testRoom'),

		// room2
		room4 = TestBox.ROOM('testRoom');

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
