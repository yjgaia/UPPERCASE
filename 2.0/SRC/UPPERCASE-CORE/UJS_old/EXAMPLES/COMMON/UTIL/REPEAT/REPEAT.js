TEST('REPEAT', function(ok) {
	'use strict';

	var
	// count
	count = 0;

	REPEAT(10, function(i) {

		ok(i === count);

		count += 1;
	});

	count = 5;

	REPEAT({
		start : 5,
		end : 10
	}, function(i) {

		ok(i === count);

		count += 1;
	});

	count = 1;

	REPEAT({
		start : 1,
		limit : 5
	}, function(i) {

		TEST('REPEAT', function(ok) {
			ok(i === count);
		});

		count += 1;
	});

	count = 3;

	REPEAT({
		start : 3,
		end : 1
	}, function(i) {

		ok(i === count);

		count -= 1;
	});
});
