TEST('MSG', (check) => {
	
	check(MSG({
		ko : '한글, 안녕하세요!',
		en : 'English, Hello!'
	}) === '한글, 안녕하세요!');
	
	/*check(MSG({
		ko : '한글, 안녕하세요!',
		en : 'English, Hello!'
	}) === 'English, Hello!');*/
});
