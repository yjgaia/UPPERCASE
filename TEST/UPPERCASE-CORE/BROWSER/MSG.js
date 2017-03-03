TEST('MSG', (check) => {

	// if you want to change language, use INFO.changeLang('ko').

	if (INFO.getLang() === 'ko') {

		check(MSG({
			ko : '한글, 안녕하세요!',
			en : 'English, Hello!'
		}) === '한글, 안녕하세요!');
	}

	if (INFO.getLang() === 'en') {

		check(MSG({
			ko : '한글, 안녕하세요!',
			en : 'English, Hello!'
		}) === 'English, Hello!');
	}
});
