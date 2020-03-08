TEST('FIND', (check) => {

	let data = {
		a : 1,
		b : 2,
		c : 3
	};
	
	let array = [3, 2, 1];

	check(FIND({
		data : data,
		value : 1
	}) === 'a');

	check(FIND({
		array : array,
		value : 1
	}) === 2);
});
