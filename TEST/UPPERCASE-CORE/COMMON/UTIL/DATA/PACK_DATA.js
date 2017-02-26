TEST('PACK_DATA', (check) => {

	let data = {
		number : 123,
		now : new Date(),
		o : {
			date : new Date()
		},
		regex : new RegExp('test', 'g')
	};

	let packedData = PACK_DATA(data);

	let unpackedData = UNPACK_DATA(packedData);

	check(CHECK_ARE_SAME([data, unpackedData]) === true);
});
