/*

Welcome to UPPERCASE-MODEL! (http://uppercase.io)

*/

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
			//OPTIONAL: params.isNotUsingObjectId
			//OPTIONAL: params.isNotUsingHistory
			
			let getBoxName = self.getBoxName = () => {
				return box.boxName;
			};

			// to implement.
		}
	});
});
