TEST('SHOW_WARNING', (check) => {

	SHOW_WARNING('샘플 경고', '당신에게 경고합니다!');
	
	SHOW_WARNING('샘플 경고', '당신에게 경고합니다!', {
		a : 1,
		b : 2,
		c : 3
	});
});
