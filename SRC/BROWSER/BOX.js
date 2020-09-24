OVERRIDE(BOX, (origin) => {

	/*
	 * BOX를 생성합니다.
	 */
	global.BOX = METHOD((m) => {

		m.getAllBoxes = origin.getAllBoxes;

		return {

			run: (boxName) => {
				//REQUIRED: boxName

				if (BROWSER_CONFIG[boxName] === undefined) {
					BROWSER_CONFIG[boxName] = {};
				}

				return origin(boxName);
			}
		};
	});
});
