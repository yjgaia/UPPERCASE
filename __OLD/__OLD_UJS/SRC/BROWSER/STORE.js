/**
 * Browser store class
 */
global.STORE = CLASS({

	init : function(inner, self, storeName) {
		'use strict';
		//REQUIRED: storeName

		var
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

			// full name
			fullName = genFullName(name),

			// value
			value = params.value,

			// is to session
			isToSession = params.isToSession;

			sessionStorage.setItem(fullName, STRINGIFY(value));

			if (isToSession !== true) {
				localStorage.setItem(fullName, STRINGIFY(value));
			}
		};

		self.get = get = function(name) {
			//REQUIRED: name

			var
			// full name
			fullName = genFullName(name),

			// value
			value = PARSE_STR(sessionStorage.getItem(fullName));

			if (value === undefined || value === TO_DELETE) {
				value = PARSE_STR(localStorage.getItem(fullName));

				if (value === TO_DELETE) {
					value = undefined;
				}
			}

			return value;
		};
		
		self.list = list = function() {
			
			var
			// values
			values = {},
			
			// full name
			fullName,
			
			// name
			name,
			
			// i
			i;
			
			// find session storage value.
			for (i = 0; i < sessionStorage.length; i += 1) {
				
				fullName = sessionStorage.key(i);
				
				if (fullName.substring(0, storeName.length + 1) === storeName + '.') {
					
					name = fullName.substring(storeName.length + 1);
					
					values[name] = get(name);
				}
			}
			
			// find local storage value.
			for (i = 0; i < localStorage.length; i += 1) {
				
				fullName = localStorage.key(i);
				
				if (fullName.substring(0, storeName.length + 1) === storeName + '.') {
					
					name = fullName.substring(storeName.length + 1);
					
					values[name] = get(name);
				}
			}
			
			return values;
		};

		self.remove = remove = function(name) {
			//REQUIRED: name

			var
			// full name
			fullName = genFullName(name);

			sessionStorage.removeItem(fullName);
			localStorage.removeItem(fullName);
		};
	}
});

FOR_BOX(function(box) {
	'use strict';

	box.STORE = CLASS({

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// store
			store = STORE(box.boxName + '.' + storeName),

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
