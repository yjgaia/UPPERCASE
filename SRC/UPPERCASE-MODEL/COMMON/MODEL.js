FOR_BOX((box) => {

	/*
	 * MODEL 클래스
	 */
	box.MODEL = CLASS({

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//OPTIONAL: params.config
			
			let getBoxName = self.getBoxName = () => {
				return box.boxName;
			};

			// to implement.
		}
	});
});
