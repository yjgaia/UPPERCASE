TEST('TITLE', (check) => {

	// change browser's title.
	TITLE('Title Changed.');
	
	check(TITLE() === 'Title Changed.');
});
