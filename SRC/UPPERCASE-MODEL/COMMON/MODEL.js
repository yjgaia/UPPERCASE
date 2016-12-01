FOR_BOX(function(box) {
	'use strict';

	/**
	 * MODEL 클래스
	 */
	box.MODEL = CLASS({

		init : function(inner, self, params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//OPTIONAL: params.config
			
			var
			// get box name.
			getBoxName;
			
			self.getBoxName = getBoxName = function() {
				return box.boxName;
			};

			// to implement.
		}
	});
});
