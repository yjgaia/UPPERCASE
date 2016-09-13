/*

Welcome to UPPERCASE! (http://uppercase.io)

*/

FOR_BOX(function(box) {'use strict';

	/**
	 * Model(include CRUD functions) interface
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
