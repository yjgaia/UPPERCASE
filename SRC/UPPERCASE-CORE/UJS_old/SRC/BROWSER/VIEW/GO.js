/**
 * go another view.
 */
global.GO = METHOD(function(m) {
	'use strict';
	
	var
	// is ctrl key down
	isCTRLKeyDown;

	return {
		
		run : function(uri) {
			//REQUIRED: uri
			
			if (isCTRLKeyDown === undefined) {
				isCTRLKeyDown = false;
							
				EVENT('keydown', function(e) {
					if (e.getKeyCode() === 17) {
						isCTRLKeyDown = true;
					}
				});
				
				EVENT('keyup', function(e) {
					if (e.getKeyCode() === 17) {
						isCTRLKeyDown = false;
					}
				});
			}
			
			if (isCTRLKeyDown === true) {
				
				GO_NEW_WIN(uri);
				
				isCTRLKeyDown = false;
			}
			
			else {
				
				history.pushState(undefined, undefined, HREF(uri));
				
				MATCH_VIEW.checkAll();
			}
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.GO = METHOD({

		run : function(uri) {
			//REQUIRED: uri

			GO((box.boxName === CONFIG.defaultBoxName ? '' : box.boxName + '/') + uri);
		}
	});
});
