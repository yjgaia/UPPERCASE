# UADMIN
데이터베이스에 저장된 데이터를 다루고, 트래픽 등을 분석하는 기능을 가지고 있는 관리 툴입니다.
UADMIN을 작동시키기 위해서는 프로젝트 실행을 위한 코드에 다음과 같이 `UADMIN_CONFIG` 설정을 추가하여 실행합니다.
```javascript
require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
		...
	},
	NODE_CONFIG : {
		...
	},
	UADMIN_CONFIG : {
		
		port : 8524,
		password : '1234',
		
		init : function(addModel) {
			addModel(SampleBox.SampleModel);
			addModel(SampleBox.TestModel);
			addModel(SampleBox.UserModel);
		}
	}
});
```

- `port` : UADMIN이 작동할 포트를 지정합니다.
- `password` : UADMIN 접속 비밀번호를 지정합니다.
- `init` : 초기화를 수행하는 함수입니다. `addModel`로 관리하고 싶은 MODEL을 추가할 수 있습니다.

이제 브라우저에서 `http://localhost:8524`를 입력하여 UADMIN에 접속할 수 있습니다.
