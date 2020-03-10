TEST('COPY', (check) => {

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
	
	let copy = COPY(data);

	copy.a = 2;

	check(CHECK_ARE_SAME([copy, {
		a : 2,
		b : ['a', 'b', 'c'],
		c : {
			d : 1
		}
	}]) === true);

	copy = COPY(array);

	copy[0] = 2;

	check(CHECK_ARE_SAME([copy, [2, ['a', 'b', 'c'], {
		d : 1
	}]]) === true);
});
