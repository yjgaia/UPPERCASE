TEST('ADD_FONT', (check) => {
	
	ADD_FONT({
		name : 'Noto Sans KR',
		style : 'normal',
		weight : 400,
		woff2 : '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2',
		woff : '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff',
		opentype : '//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf'
	});
	
	let div = DIV({
		style : {
			position : 'fixed',
			left : 40,
			top : 40,
			backgroundColor : 'red',
			padding : 20,
			margin : 0,
			fontFamily : 'Noto Sans KR',
			fontSize : 30
		},
		c : '웹 폰트가 적용되었습니다.'
	}).appendTo(BODY);
});
