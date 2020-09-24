FOR_BOX((box) => {

	/*
	 * MODEL 클래스
	 */
	box.MODEL = CLASS({

		init: (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//OPTIONAL: params.initData
			//OPTIONAL: params.methodConfig
			//OPTIONAL: params.methodConfig.create
			//OPTIONAL: params.methodConfig.create.valid
			//OPTIONAL: params.methodConfig.create.role
			//OPTIONAL: params.methodConfig.create.authKey
			//OPTIONAL: params.methodConfig.create.adminRole
			//OPTIONAL: params.methodConfig.get
			//OPTIONAL: params.methodConfig.get.role
			//OPTIONAL: params.methodConfig.update
			//OPTIONAL: params.methodConfig.update.valid
			//OPTIONAL: params.methodConfig.update.role
			//OPTIONAL: params.methodConfig.update.authKey
			//OPTIONAL: params.methodConfig.update.adminRole
			//OPTIONAL: params.methodConfig.remove
			//OPTIONAL: params.methodConfig.remove.role
			//OPTIONAL: params.methodConfig.remove.authKey
			//OPTIONAL: params.methodConfig.remove.adminRole
			//OPTIONAL: params.methodConfig.find
			//OPTIONAL: params.methodConfig.find.role
			//OPTIONAL: params.methodConfig.count
			//OPTIONAL: params.methodConfig.count.role
			//OPTIONAL: params.methodConfig.checkExists
			//OPTIONAL: params.methodConfig.checkExists.role
			//OPTIONAL: params.isNotUsingObjectId
			//OPTIONAL: params.isNotUsingHistory
			//OPTIONAL: params.isNotToInitialize

			let getBoxName = self.getBoxName = () => {
				return box.boxName;
			};

			// to implement.
		}
	});
});
