/*
 * 뷰를 새로 불러옵니다.
 */
global.REFRESH = METHOD((m) => {
	
	const REFRESHING_URI = '__REFRESHING';
	
	let getRefreshingURI = m.getRefreshingURI = () => {
		return REFRESHING_URI;
	};
	
	return {

		run : (uri) => {
			//OPTIONAL: uri
	
			let savedURI = uri !== undefined ? uri : location.pathname.substring(1);
	
			history.pushState(undefined, undefined, '/' + REFRESHING_URI);
			MATCH_VIEW.checkAll();
			
			history.replaceState(undefined, undefined, '/' + savedURI);
			MATCH_VIEW.checkAll();
		}
	};
});

FOR_BOX((box) => {

	box.REFRESH = METHOD({

		run : (uri) => {
			//OPTIONAL: uri
			
			REFRESH((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + (uri === undefined ? '' : uri));
		}
	});
});
