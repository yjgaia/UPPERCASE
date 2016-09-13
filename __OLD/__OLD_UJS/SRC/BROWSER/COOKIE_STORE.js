/**
 * Browser store class (using Cookie)
 */
global.COOKIE_STORE = CLASS({

	init : function(inner, self, storeNameOrParams) {
		'use strict';
		//REQUIRED: storeNameOrParams
		//REQUIRED: storeNameOrParams.storeName
		//OPTIONAL: storeNameOrParams.domain

		var
		// store name
		storeName,
		
		// domain
		domain,
		
		// gen full name.
		genFullName,

		// save.
		save,

		// get.
		get,
		
		// list.
		list,

		// remove.
		remove;
		
		if (CHECK_IS_DATA(storeNameOrParams) !== true) {
			storeName = storeNameOrParams;
		} else {
			storeName = storeNameOrParams.storeName;
			domain = storeNameOrParams.domain;
		}

		inner.genFullName = genFullName = function(name) {
			//REQUIRED: name

			return storeName + '.' + name;
		};

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

			document.cookie = genFullName(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '; expires=' + (expireTime === 0 ? expireTime : expireTime.toGMTString()) + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};

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
		
		self.list = list = function() {
			
			var
			// values
			values = {},
			
			// full name
			fullName,
			
			// name
			name;
			
			EACH(document.cookie.split(';'), function(str) {
				
				var
				// index
				index = str.indexOf('='),
				
				// full name
				fullName = str.substring(0, index);
				
				if (fullName.substring(0, storeName.length + 1) === storeName + '.') {
					
					name = fullName.substring(storeName.length + 1);
					
					values[name] = str.substring(index + 1);
				}
			});
			
			return values;
		};

		self.remove = remove = function(name) {
			//REQUIRED: name

			var
			// expire time
			expireTime;

			expireTime = new Date();
			expireTime.setDate(expireTime.getDate() - 1);
			
			document.cookie = genFullName(name) + '=; expires=' + expireTime.toGMTString() + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.COOKIE_STORE = CLASS({

		init : function(inner, self, storeNameOrParams) {
			//REQUIRED: storeNameOrParams
			//REQUIRED: storeNameOrParams.storeName
			//OPTIONAL: storeNameOrParams.domain

			var
			// store name
			storeName,
			
			// domain
			domain,
			
			// store
			store,
			
			// save.
			save,

			// get.
			get,

			// remove.
			remove;
			
			if (CHECK_IS_DATA(storeNameOrParams) !== true) {
				storeName = storeNameOrParams;
			} else {
				storeName = storeNameOrParams.storeName;
				domain = storeNameOrParams.domain;
			}
			
			store = COOKIE_STORE({
				storeName : box.boxName + '.' + storeName,
				domain : domain
			});

			self.save = save = store.save;

			self.get = get = store.get;

			self.remove = remove = store.remove;
		}
	});
});
