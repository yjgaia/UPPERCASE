/*
 * 저장소 클래스
 * 
 * 웹 브라우저가 종료되어도 저장된 값들이 보존됩니다.
 */
global.STORE = CLASS({

	init : (inner, self, storeName) => {
		//REQUIRED: storeName
		
		// gen full name.
		let genFullName = (name) => {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		let save = self.save = (params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value

			let name = params.name;
			let value = params.value;

			localStorage.setItem(genFullName(name), STRINGIFY(value));
		};

		let get = self.get = (name) => {
			//REQUIRED: name

			let value = PARSE_STR(localStorage.getItem(genFullName(name)));

			if (value === TO_DELETE) {
				value = undefined;
			}

			return value;
		};

		let remove = self.remove = (name) => {
			//REQUIRED: name
			
			localStorage.removeItem(genFullName(name));
		};

		let all = self.all = () => {
			
			let all = {};
			
			EACH(localStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					all[fullName.substring(storeName.length + 1)] = PARSE_STR(value);
				}
			});
			
			return all;
		};

		let count = self.count = () => {
			
			let count = 0;
			
			EACH(localStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					count += 1;
				}
			});
			
			return count;
		};

		let clear = self.clear = () => {
			
			EACH(localStorage, (value, fullName) => {
				
				if (fullName.indexOf(storeName + '.') === 0) {
					
					remove(fullName.substring(storeName.length + 1));
				}
			});
		};
	}
});

FOR_BOX((box) => {

	box.STORE = CLASS({

		init : (inner, self, storeName) => {
			//REQUIRED: storeName

			let store = STORE(box.boxName + '.' + storeName);

			let save = self.save = store.save;
			
			let get = self.get = store.get;
			
			let remove = self.remove = store.remove;
			
			let all = self.all = store.all;
			
			let count = self.count = store.count;
			
			let clear = self.clear = store.clear;
		}
	});
});
