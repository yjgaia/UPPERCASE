/*
 * 쿠키 저장소 클래스
 * 
 * 쿠키에 데이터를 저장할 수 있는 클래스 입니다.
 * domain 파라미터를 통해 쿠키를 불러 올 수 있는 도메인 범위를 지정할 수 있습니다.
 * 웹 브라우저가 종료되어도 저장된 값들이 보존됩니다.
 */
global.COOKIE_STORE = CLASS({

	init : (inner, self, storeNameOrParams) => {
		//REQUIRED: storeNameOrParams
		//REQUIRED: storeNameOrParams.storeName
		//OPTIONAL: storeNameOrParams.domain

		let storeName;
		let domain;
		
		if (CHECK_IS_DATA(storeNameOrParams) !== true) {
			storeName = storeNameOrParams;
		} else {
			storeName = storeNameOrParams.storeName;
			domain = storeNameOrParams.domain;
		}

		let genFullName = inner.genFullName = (name) => {
			//REQUIRED: name

			return storeName + '.' + name;
		};

		let save = self.save = (params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//REQUIRED: params.value
			//OPTIONAL: params.isToSession

			let name = params.name;
			let value = params.value;
			let isToSession = params.isToSession;

			let expireTime;
			
			if (isToSession === true) {
				expireTime = 0;
			} else {
				// set expire time 1 year
				expireTime = new Date();
				expireTime.setDate(expireTime.getDate() + 356);
			}

			document.cookie = genFullName(name) + '=' + encodeURIComponent(JSON.stringify(value)) + '; expires=' + (expireTime === 0 ? expireTime : expireTime.toGMTString()) + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};

		let get = self.get = (name) => {
			//REQUIRED: name

			name = genFullName(name) + '=';

			let cookie = document.cookie;
			let i = cookie.indexOf(name);

			let pop;
			if (cookie && i >= 0) {
				let temp = cookie.substring(i, cookie.length);
				let d = temp.indexOf(';');
				if (d > 0) {
					pop = temp.substring(name.length, d);
				} else {
					pop = temp.substring(name.length);
				}
			}
			
			return pop === undefined ? undefined : JSON.parse(decodeURIComponent(pop));
		};
		
		let list = self.list = () => {
			
			let values = {};
			
			EACH(document.cookie.split(';'), (str) => {
				
				let index = str.indexOf('=');
				let fullName = str.substring(0, index);
				
				if (fullName.substring(0, storeName.length + 1) === storeName + '.') {
					values[fullName.substring(storeName.length + 1)] = str.substring(index + 1);
				}
			});
			
			return values;
		};

		let remove = self.remove = (name) => {
			//REQUIRED: name

			let expireTime = new Date();
			expireTime.setDate(expireTime.getDate() - 1);
			
			document.cookie = genFullName(name) + '=; expires=' + expireTime.toGMTString() + '; path=/;' + (domain === undefined ? '' : ' domain=' + domain + ';');
		};
	}
});

FOR_BOX((box) => {

	box.COOKIE_STORE = CLASS({

		init : (inner, self, storeNameOrParams) => {
			//REQUIRED: storeNameOrParams
			//REQUIRED: storeNameOrParams.storeName
			//OPTIONAL: storeNameOrParams.domain

			let storeName;
			let domain;
			
			if (CHECK_IS_DATA(storeNameOrParams) !== true) {
				storeName = storeNameOrParams;
			} else {
				storeName = storeNameOrParams.storeName;
				domain = storeNameOrParams.domain;
			}
			
			let store = COOKIE_STORE({
				storeName : box.boxName + '.' + storeName,
				domain : domain
			});

			let save = self.save = store.save;
			let get = self.get = store.get;
			let remove = self.remove = store.remove;
		}
	});
});