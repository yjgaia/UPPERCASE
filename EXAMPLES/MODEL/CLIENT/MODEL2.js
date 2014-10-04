TEST('MODEL', function(ok) {
	'use strict';

	var
	// on new room
	onNewRoom,

	// on new watching room
	onNewWatchingRoom,

	// on remove room
	onRemoveRoom;

	CONNECT_TO_ROOM_SERVER({
		port : 9127,
		fixRequestURI : '__WEB_SOCKET_FIX'
	});

	// Example Model
	TestBox.TestModel = OBJECT({

		preset : function() {
			return TestBox.MODEL;
		},

		params : function() {

			var
			// valid data set
			validDataSet;

			validDataSet = {
				name : {
					notEmpty : true,
					size : {
						min : 0,
						max : 255
					}
				},
				age : {
					notEmpty : true,
					integer : true
				},
				isMan : {
					bool : true
				}
			};

			return {
				name : 'Test',
				methodConfig : {
					create : {
						valid : VALID(validDataSet)
					},
					update : {
						valid : VALID(validDataSet)
					},
					remove : {
						role : 'Test'
					}
				}
			};
		}
	});

	onNewRoom = TestBox.TestModel.onNew({
		name : 'YJ Sim',
		age : 27
	}, function(savedData) {
		console.log('CREATED!', savedData);
	});

	onNewWatchingRoom = TestBox.TestModel.onNewWatching({
		name : 'YJ Sim',
		age : 27
	}, function(savedData, addUpdateHandler, addRemoveHandler) {

		console.log('CREATED!', savedData);

		addUpdateHandler(function(savedData) {
			console.log('UPDATED!', savedData);
		});

		addRemoveHandler(function(savedData) {
			console.log('REMOVED!', savedData);
		});
	});
	
	onRemoveRoom = TestBox.TestModel.onRemove({
		age : 27
	}, function(savedData) {
		console.log('REMOVED!', savedData);
	});

	INTERVAL(1, function() {

		TestBox.TestModel.create({
			name : 'YJ Sim',
			age : 27
		}, {
			notValid : function(r) {
				console.log('not valid!', r);
			},
			success : function(d) {
				TestBox.TestModel.update({
					id : d.id,
					name : 'test'
				}, function(d) {
					TestBox.TestModel.remove(d.id);
				});
			}
		});
	});

	DELAY(3, function() {
		onNewRoom.exit();
		onNewWatchingRoom.exit();
		onRemoveRoom.exit();
	});
});
