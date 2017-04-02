FOR_BOX((box) => {

	/*
	 * MODEL 클래스
	 */
	box.MODEL = CLASS({

		init : (inner, self, params) => {
			//REQUIRED: params
			//OPTIONAL: params.roomServerName
			//REQUIRED: params.name
			//OPTIONAL: params.initData
			//OPTIONAL: params.methodConfig
			//OPTIONAL: params.methodConfig.create
			//OPTIONAL: params.methodConfig.create.valid
			//OPTIONAL: params.methodConfig.get
			//OPTIONAL: params.methodConfig.update
			//OPTIONAL: params.methodConfig.update.valid
			//OPTIONAL: params.methodConfig.remove
			//OPTIONAL: params.methodConfig.find
			//OPTIONAL: params.methodConfig.count
			//OPTIONAL: params.methodConfig.checkIsExists
			//OPTIONAL: params.isNotUsingObjectId
			//OPTIONAL: params.isNotUsingHistory
			
			let getBoxName = self.getBoxName = () => {
				return box.boxName;
			};

			// to implement.
		}
	});
});
