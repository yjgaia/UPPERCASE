OVERRIDE(BOX, (origin) => {
	
	/*
	 * BOX를 생성합니다.
	 */
	global.BOX = METHOD((m) => {
		
		m.getAllBoxes = origin.getAllBoxes;
		
		return {
			
			run : (boxName) => {
				//REQUIRED: boxName
				
				if (NODE_CONFIG[boxName] === undefined) {
					NODE_CONFIG[boxName] = {};
				}
				
				return origin(boxName);
			}
		};
	});
});
