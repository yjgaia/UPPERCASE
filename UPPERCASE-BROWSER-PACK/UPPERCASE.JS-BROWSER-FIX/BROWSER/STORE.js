OVERRIDE(STORE, function(origin) {
	'use strict';

	/**
	 * Local Store class (fix)
	 */
	global.STORE = CLASS({

		preset : function() {
			return origin;
		},

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// gen full name.
			genFullName = inner.genFullName,

			// save.
			save,

			// get.
			get,

			// remove.
			remove;

			//OVERRIDE: self.save
			self.save = save = function(params) {
				//REQUIRED: params
				//REQUIRED: params.name
				//REQUIRED: params.value
				//OPTIONAL: params.isToSession

				var
				// name
				name = params.name,

				// value
				value = params.value,

				// expire time
				expireTime,

				// is to session
				isToSession = params.isToSession;

				if (isToSession === true) {
					expireTime = 0;
				} else {

					// set expire time 1 year
					expireTime = new Date();
					expireTime.setDate(expireTime.getDate() + 356);
				}

				document.cookie = genFullName(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '; path=/; expires=' + expireTime.toGMTString() + ';';
			};

			//OVERRIDE: self.save
			self.get = get = function(name) {
				//REQUIRED: name

				var
				// cookie
				cookie = document.cookie,

				// isPop
				pop,

				// extras
				i, temp, d;

				name = genFullName(name) + '=';

				i = cookie.indexOf(name);

				if (cookie && i >= 0) {
					temp = cookie.substring(i, cookie.length);
					d = temp.indexOf(';');
					if (d > 0) {
						pop = temp.substring(name.length, d);
					} else {
						pop = temp.substring(name.length);
					}
				}
				return pop === undefined ? undefined : JSON.parse(decodeURIComponent(pop));
			};

			//OVERRIDE: self.save
			self.remove = remove = function(name) {
				//REQUIRED: name

				var
				// expire time
				expireTime;

				expireTime = new Date();
				expireTime.setDate(expireTime.getDate() - 1);

				document.cookie = genFullName(name) + '=; path=/; expires=' + expireTime.toGMTString() + ';';
			};
		}
	});
});
