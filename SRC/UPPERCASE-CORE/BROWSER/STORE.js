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
		}
	});
});
