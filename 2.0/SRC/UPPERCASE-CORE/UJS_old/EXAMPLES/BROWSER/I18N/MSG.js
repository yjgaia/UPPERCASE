TEST('MSG', function(ok) {
	'use strict';

	// if you want to change language, use INFO.changeLang('ko').

	if (INFO.getLang() === 'ko') {

		ok(MSG({
			ko : '한글, 안녕하세요!',
			en : 'English, Hello!'
		}) === '한글, 안녕하세요!');
	}

	if (INFO.getLang() === 'en') {

		ok(MSG({
			ko : '한글, 안녕하세요!',
			en : 'English, Hello!'
		}) === 'English, Hello!');
	}
});
