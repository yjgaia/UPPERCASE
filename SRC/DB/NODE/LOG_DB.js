FOR_BOX(function(box) {'use strict';

	/**
	 * MongoDB collection wrapper for log class
	 */
	box.LOG_DB = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// native db
			nativeDB = CONNECT_TO_DB_SERVER.getNativeDB(),

			// MongoDB collection
			collection = nativeDB.collection(box.boxName + '.' + name),

			// log.
			log;

			self.log = log = function(data) {
				//REQUIRED: data

				// now
				data.time = new Date();

				collection.save(data, function() {
					// ignore.
				});
			};
		}
	});
});
