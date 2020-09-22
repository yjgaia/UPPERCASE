FOR_BOX((box) => {

	OVERRIDE(box.MODEL, (origin) => {

		/*
		 * MODEL 클래스
		 */
		box.MODEL = CLASS({
			
			preset : () => {
				return origin;
			},
			
			params : () => {
				return {
					isNotToInitialize : NODE_CONFIG.isNotToModelInitialize
				};
			}
		});
	});
});
