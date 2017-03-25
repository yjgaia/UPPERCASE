TEST('URI', (check) => {

	// go test view.
	TestBox.GO('go/1');
	
	check(URI() === 'TestBox/go/1');
});
