FOR_BOX(function(box) {
	'use strict';

	/**
	 * CPU and server clustering shared store class
	 */
	box.SHARED_STORE = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// shared store
			sharedStore = SHARED_STORE(box.boxName + '.' + name),

			// save.
			save,

			// get.
			get,
			
			// list.
			list,

			// remove.
			remove;

			self.save = save = sharedStore.save;

			self.get = get = sharedStore.get;
			
			self.list = list = sharedStore.list;

			self.remove = remove = sharedStore.remove;
		}
	});
});
