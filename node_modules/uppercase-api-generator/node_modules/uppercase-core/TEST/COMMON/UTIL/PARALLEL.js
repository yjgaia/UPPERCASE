TEST('PARALLEL', (check) => {

	let data = {};
	
	let count = 0;
	
	let sum = 0;

	PARALLEL([

	// func1
	(done) => {

		setTimeout(() => {

			data.a = 1;

			done();
		}, 100);
	},

	// func2
	(done) => {

		setTimeout(() => {

			data.b = 2;

			done();
		}, 100);
	},

	// func3
	(done) => {

		setTimeout(() => {

			data.c = 3;

			done();
		}, 100);
	},

	// done
	() => {
		check(CHECK_ARE_SAME([data, {
			a : 1,
			b : 2,
			c : 3
		}]));
	}]);

	PARALLEL(3, [

	// func1
	(i, done) => {

		setTimeout(() => {

			count += 1;

			done();
		}, 100);
	},

	() => {
		check(count === 3);
	}]);
	
	PARALLEL([1, 2, 3], [

	// func1
	(value, done) => {

		setTimeout(() => {

			sum += value;

			done();
		}, 100);
	},

	() => {
		check(sum === 6);
	}]);
});
