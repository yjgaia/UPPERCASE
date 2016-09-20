TEST('PACK_DATA', function(check) {
	'use strict';

	var
	// data
	data,

	// packed data
	packedData,

	// unpacked data
	unpackedData;

	data = {
		number : 123,
		now : new Date(),
		o : {
			date : new Date()
		},
		regex : new RegExp('test', 'g')
	};

	packedData = PACK_DATA(data);

	unpackedData = UNPACK_DATA(packedData);

	check(CHECK_ARE_SAME([data, unpackedData]) === true);
});
