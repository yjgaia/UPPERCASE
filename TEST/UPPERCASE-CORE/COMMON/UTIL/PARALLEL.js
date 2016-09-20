TEST('PARALLEL', function(check) {
	'use strict';

	var
	// data
	data = {},

	// count
	count = 0,
	
	// sum
	sum = 0;

	PARALLEL([

	// func1
	function(done) {

		setTimeout(function() {

			data.a = 1;

			done();
		}, 100);
	},

	// func2
	function(done) {

		setTimeout(function() {

			data.b = 2;

			done();
		}, 100);
	},

	// func3
	function(done) {

		setTimeout(function() {

			data.c = 3;

			done();
		}, 100);
	},

	// done
	function() {
		check(CHECK_ARE_SAME([data, {
			a : 1,
			b : 2,
			c : 3
		}]));
	}]);

	PARALLEL(3, [

	// func1
	function(i, done) {

		setTimeout(function() {

			count += 1;

			done();
		}, 100);
	},

	function() {
		check(count === 3);
	}]);
	
	PARALLEL([1, 2, 3], [

	// func1
	function(value, done) {

		setTimeout(function() {

			sum += value;

			done();
		}, 100);
	},

	function() {
		check(sum === 6);
	}]);
});
