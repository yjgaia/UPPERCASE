TEST('CONSOLE_COLOR', (check) => {

	SHOW_ERROR('샘플 오류', '엄청난 오류가 발생했습니다!');
	
	SHOW_ERROR('샘플 오류', '엄청난 오류가 발생했습니다!', {
		a : 1,
		b : 2,
		c : 3
	});
});
