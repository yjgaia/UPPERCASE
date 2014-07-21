TestBox.MAIN = function() {

	TestBox.TestModel.create({
		name : 'YJ Sim',
		age : 27,
		isMan : true
	}, function(data) {
		console.log(data);
	});
};
