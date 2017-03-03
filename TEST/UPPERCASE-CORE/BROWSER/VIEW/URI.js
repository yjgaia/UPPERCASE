TEST('URI', (check) => {

	// go test view.
	GO('go/1');
	
	check(URI() === 'go/1');
});
