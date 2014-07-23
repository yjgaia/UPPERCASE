CONNECT_TO_ROOM_SERVER({
	port : 8128,
	fixServerPort : 8129
});

// Example Model
TestBox.TestModel = OBJECT({

	preset : function() {'use strict';
		return TestBox.MODEL;
	},

	params : function() {'use strict';

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
			config : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				}
			}
		};
	}
});

TestBox.TestModel.create({
	name : 'YJ Sim',
	isMan : true
}, {
	notValid : function(r) {
		console.log(r);
	},
	success : function(r) {
		console.log(r);
	}
});

TestBox.TestModel.find({}, function(r) {
	console.log(r);
});

TestBox.TestModel.get('test', function(r) {
	console.log(r);
});

TestBox.TestModel.onNew(function(savedData) {
	console.log('ON NEW: ', savedData);
});

TestBox.TestModel.onNew({
	factorCount : 1
}, function(savedData) {
	console.log('ON NEW when factorCount is 1: ', savedData);
});

TestBox.TestModel.onNewWatching({
	factorCount : 2
}, function(savedData, addUpdateHandler, addRemoveHandler, closeWatching) {
	console.log('ON NEW when factorCount is 2: ', savedData);

	addUpdateHandler(function(savedData) {
		console.log('UPDATE! when factorCount is 2: ', savedData);
	});
});

TestBox.TestModel.create({}, function(result) {

	// result.hasError
	// -> true -> result.errors
	// -> false -> result.savedData

	console.log(result);
});

TestBox.TestModel.create({
	name : 'YJ Sim',
	age : 27,
	isMan : true
});

TestBox.TestModel.create({
	name : 'YJ Sim',
	age : 27,
	isMan : true
}, function(savedData) {

	console.log('CREATE: ', savedData);

	TestBox.TestModel.get(savedData.id, function(savedData) {
		console.log('GET: ', savedData);

		TestBox.TestModel.update({
			id : savedData.id,
			name : 'TEST!!!' + new Date().getTime()
		}, function(savedData) {
			console.log('UPDATE: ', savedData);

			TestBox.TestModel.remove(savedData.id, {
				notAuthed : function() {
					console.log('not authed!!');
				},
				success : function(savedData) {
					console.log('REMOVE: ', savedData);
				}
			});
		});
	});
});
