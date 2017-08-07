/*
 * URI를 변경하여 다른 뷰로 이동합니다.
 */
global.GO = METHOD((m) => {
	
	let isCTRLKeyDown;

	return {
		
		run : (uri) => {
			//REQUIRED: uri
			
			if (isCTRLKeyDown === undefined) {
				isCTRLKeyDown = false;
				
				EVENT('keydown', (e) => {
					if (e.getKey() === 'Control') {
						isCTRLKeyDown = true;
					}
				});
				
				EVENT('keyup', (e) => {
					if (e.getKey() === 'Control') {
						isCTRLKeyDown = false;
					}
				});
			}
			
			if (isCTRLKeyDown === true) {
				
				GO_NEW_WIN(uri);
				
				isCTRLKeyDown = false;
			}
			
			else {
				
				// when protocol is 'file:', use hashbang.
				if (location.protocol === 'file:') {
					location.href = HREF(uri);
				} else {
					history.pushState(undefined, undefined, HREF(uri));
				}
				
				MATCH_VIEW.checkAll();
			}
		}
	};
});

FOR_BOX((box) => {

	box.GO = METHOD({

		run : (uri) => {
			//REQUIRED: uri

			GO((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
