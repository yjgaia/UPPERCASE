/**
 * 저장소 클래스
 * 
 * 웹 브라우저가 종료되어도 저장된 값들이 보존됩니다.
 */
global.STORE = CLASS({

	init : function(inner, self, storeName) {
		'use strict';
		//REQUIRED: storeName

		var
		// save.
		save,

		// get.
		get,
		
		// all.
		all,

		// remove.
		remove,
		
		// gen full name.
		genFullName = function(name) {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		self.save = save = function(params) {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			var
			// name
			name = params.name,
			
			// value
			value = params.value;

			localStorage.setItem(genFullName(name), STRINGIFY(value));
		};

		self.get = get = function(name) {
			//REQUIRED: name

			var
			// value
			value = PARSE_STR(localStorage.getItem(genFullName(name)));

			if (value === TO_DELETE) {
				value = undefined;
			}

			return value;
		};

		self.remove = remove = function(name) {
			//REQUIRED: name
			
			localStorage.removeItem(genFullName(name));
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
