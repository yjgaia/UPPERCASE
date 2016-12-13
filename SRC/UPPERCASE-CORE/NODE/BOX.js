OVERRIDE(BOX, function(origin) {
	
	/**
	 * BOX를 생성합니다.
	 */
	global.BOX = METHOD(function(m) {
		'use strict';
		
		m.getAllBoxes = origin.getAllBoxes;
		
		return {
			
			run : function(boxName) {
				//REQUIRED: boxName
				'use strict';
				
				if (NODE_CONFIG[boxName] === undefined) {
					NODE_CONFIG[boxName] = {};
				}
		
				return origin(boxName);
			}
		};
	});
});
