FOR_BOX(function(box) {
	'use strict';

	/**
	 * MongoDB collection wrapper for log class
	 */
	box.LOG_DB = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// waiting log data set
			waitingLogDataSet = [],

			// log.
			log;

			self.log = log = function(data) {
				//REQUIRED: data

				waitingLogDataSet.push(data);
			};

			CONNECT_TO_DB_SERVER.addInitDBFunc(function(nativeDB) {

				var
				// MongoDB collection
				collection = nativeDB.collection(box.boxName + '.' + name);

				self.log = log = function(data) {
					//REQUIRED: data

					// now
					data.time = new Date();

					collection.insert(data, {
						w : 0
					});
				};

				EACH(waitingLogDataSet, function(data) {
					log(data);
				});

				waitingLogDataSet = undefined;
			});
		}
	});
});
