TestBox.MAIN = function() {

	TestBox.TestModel.create({
		name : 'YJ Sim',
		age : 27,
		isMan : true
	}, function(data) {
		console.log(data);

		TestBox.TestModel.get({
			filter : {
				age : 27
			}
		}, function(data) {
			console.log(data);
		});
	});

	TestBox.TestModel.find(function(data) {
		console.log(data);
	});
};
