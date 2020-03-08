TEST('BOX', (check) => {

	// create test box.
	BOX('TestBox');

	INIT_OBJECTS();

	check(TestBox.boxName === 'TestBox');
});
