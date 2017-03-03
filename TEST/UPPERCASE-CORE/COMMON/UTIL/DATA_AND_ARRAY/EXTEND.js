TEST('EXTEND', (check) => {

	let data1 = {
		a : 1,
		b : 2,
		c : 3,
		d : ['a', 'b', 'c']
	};
	
	let data2 = {
		d : ['d', 'e'],
		e : {
			k : 1
		}
	};
	
	let array1 = [1, 2, 3];
	
	let array2 = [4, 5, [7, 8]];

	EXTEND({
		origin : data1,
		extend : data2
	});

	EXTEND({
		origin : data2,
		extend : {
			e : 5
		}
	});

	EXTEND({
		origin : array1,
		extend : array2
	});

	check(CHECK_ARE_SAME([data1, {
		a : 1,
		b : 2,
		c : 3,
		d : ['d', 'e'],
		e : {
			k : 1
		}
	}]));

	check(CHECK_ARE_SAME([data2, {
		d : ['d', 'e'],
		e : 5
	}]));

	check(CHECK_ARE_SAME([array1, [1, 2, 3, 4, 5, [7, 8]]]));
});
