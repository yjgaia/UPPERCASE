TEST('CHECK_IS_IN', (check) => {

	let data = {
		a : 1,
		b : ['a', 'b', 'c'],
		c : {
			d : 1
		}
	};
	
	let array = [1, ['a', 'b', 'c'], {
		d : 1
	}];

	check(CHECK_IS_IN({
		data : data,
		value : 1
	}) === true);

	check(CHECK_IS_IN({
		data : data,
		value : ['a', 'b', 'c']
	}) === true);

	check(CHECK_IS_IN({
		data : data,
		value : {
			d : 1
		}
	}) === true);

	check(CHECK_IS_IN({
		array : array,
		value : 1
	}) === true);

	check(CHECK_IS_IN({
		array : array,
		value : ['a', 'b', 'c']
	}) === true);

	check(CHECK_IS_IN({
		array : array,
		value : {
			d : 1
		}
	}) === true);
});
