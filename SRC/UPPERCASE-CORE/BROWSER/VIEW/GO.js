/*
 * URI를 변경하여 다른 뷰로 이동합니다.
 */
global.GO = METHOD((m) => {
	
	let isCTRLKeyDown;

	return {
		
		run : (uriOrParams) => {
			//REQUIRED: uriOrParams
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.data
			
			let uri;
			let data;
			
			if (CHECK_IS_DATA(uriOrParams) !== true) {
				uri = uriOrParams;
			} else {
				uri = uriOrParams.uri;
				data = uriOrParams.data;
			}
			
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
				
				MATCH_VIEW.setURIData(data);
				
				// when protocol is 'file:' or extension, use hashbang.
				if (location.protocol === 'file:' || location.protocol.indexOf('-extension:') !== -1) {
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

		run : (uriOrParams) => {
			//REQUIRED: uriOrParams
			//REQUIRED: uriOrParams.uri
			//OPTIONAL: uriOrParams.data
			
			let uri;
			let data;
			
			if (CHECK_IS_DATA(uriOrParams) !== true) {
				uri = uriOrParams;
			} else {
				uri = uriOrParams.uri;
				data = uriOrParams.data;
			}

			GO({
				uri : (box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri,
				data : data
			});
		}
	});
});
