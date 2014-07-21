FOR_BOX(function(box) {'use strict';

	/**
	 * Browser store class.
	 */
	box.STORE = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// store
			store = STORE(box.boxName + '.' + name),

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			self.save = save = store.save;

			self.get = get = store.get;

			self.remove = remove = store.remove;
		}
	});
});
