TEST('UNPACK_DATA', (check) => {

	let data = {
		now : new Date(),
		o : {
			d : new Date()
		},
		r : new RegExp('test', 'g')
	};

	let packedData = PACK_DATA(data);

	let unpackedData = UNPACK_DATA(packedData);

	check(CHECK_ARE_SAME([data, unpackedData]) === true);
});
