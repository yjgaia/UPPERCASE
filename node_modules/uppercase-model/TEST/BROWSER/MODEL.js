TEST('MODEL', (check) => {
	
	// Example Model
	TestBox.TestModel = OBJECT({

		preset : () => {
			return TestBox.MODEL;
		},

		params : () => {

			let validDataSet = {
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

	TestBox.TestModel.create({
		name : 'YJ Sim',
		isMan : true
	}, {
		notValid : (r) => {
			console.log(r);
		},
		success : (r) => {
			console.log(r);
		}
	});

	TestBox.TestModel.find((r) => {
		console.log(r);
	});

	TestBox.TestModel.get('test', (r) => {
		console.log(r);
	});

	TestBox.TestModel.onNew((savedData) => {
		console.log('ON NEW: ', savedData);
	});

	TestBox.TestModel.onNew({
		age : 27
	}, (savedData) => {
		console.log('ON NEW when age is 27: ', savedData);
	});

	TestBox.TestModel.onNewWatching({
		age : 27
	}, (savedData, addUpdateHandler, addRemoveHandler, closeWatching) => {
		console.log('ON NEW when age is 27: ', savedData);

		addUpdateHandler((savedData) => {
			console.log('UPDATE! when age is 27: ', savedData);
		});
	});

	TestBox.TestModel.create({}, (result) => {

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
	}, (savedData) => {

		console.log('CREATE: ', savedData);

		TestBox.TestModel.get(savedData.id, (savedData) => {
			console.log('GET: ', savedData);

			TestBox.TestModel.update({
				id : savedData.id,
				name : 'TEST!!!' + new Date().getTime()
			}, (savedData) => {
				console.log('UPDATE: ', savedData);

				TestBox.TestModel.remove(savedData.id, {
					notAuthed : () => {
						console.log('not authed!!');
					},
					success : (originData) => {
						console.log('REMOVE: ', originData);
					}
				});
			});
		});
	});
});
