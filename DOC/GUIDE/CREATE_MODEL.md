# 모델 생성
UPPERCASE는 [MVC 패턴](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)을 따릅니다. 여기서는 모델에 해당하는 부분을 만드는 방법을 알아보겠습니다.

## 목차
* [MongoDB 실행하기](#MongoDB-실행하기)
* [데이터베이스 설정](#데이터베이스-설정)
* [모델 정의 코드 작성](#모델-정의-코드-작성)
* [모델 작동 확인하기](#모델-작동-확인하기)
* [모델의 세부 기능](#모델의-세부-기능)

## MongoDB 실행하기
UPPERCASE는 DBMS로 MongoDB를 사용합니다. CMD나 터미널에서 MongoDB를 실행합니다.

###### Mac or Linux
```
mongod
```

###### Windows
```
C:
cd "C:\Program Files\MongoDB 2.6 Standard\bin"
mongod
```

## 데이터베이스 설정
[프로젝트 실행을 위한 코드](CREATE_MODEL.md#프로젝트-실행을-위한-코드-작성)를 열어 [데이터베이스 관련 설정](CONFIGURATION.md#데이터베이스-관련-설정)을 작성합니다.

###### Sample.js
```javascript
require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		defaultBoxName : 'Sample',
		title : 'Sample',
		webServerPort : 8888
	},
	NODE_CONFIG : {
		// 데이터베이스 설정
		// 데이터베이스 이름은 Sample 입니다.
		dbName : 'Sample'
	}
});
```

## 모델 정의 코드 작성
이제 모델을 정의하는 코드를 작성해보겠습니다. 프로젝트의 기본 BOX 폴더의 `COMMON` 폴더에 `SomeModel.js`를 만듭니다. 데이터 검증을 위해 [`VALID`](UPPERCASE-CORE-COMMON.md#validvaliddataset) 기능을 사용하므로 해당 내용을 숙지하시기 바랍니다.

###### SomeModel.js
```javascript
Sample.SomeModel = OBJECT({

	preset : () => {
	
		// 모델은 각 BOX의 MODEL을 상속하여 만듭니다.
		return Sample.MODEL;
	},

	params : () => {

		let validDataSet = {
			
			// 종류
			kind : {
				// 필수 입력
				notEmpty : true,
				// 아래 값들 중 하나여야 함
				one : ['dog', 'pig', 'cow']
			},
			
			// 이름
			name : {
				// 필수 입력
				notEmpty : true,
				// 최소 2글자에서 최대 10글자까지 작성 가능
				size : {
					min : 2,
					max : 10
				}
			}
		};

		return {
			// 모델 명
			name : 'Some',
			// 메소드별 설정
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				}
			}
		};
	}
});
```

메소드별 설정에 대해서는 [메소드별 설정 문서](UPPERCASE-MODEL.md#메소드별-설정)를 참고하시기 바랍니다.

## 모델 작동 확인하기
모델의 작동을 확인하기 위해 프로젝트의 기본 BOX 폴더의 `NODE` 폴더에 `MAIN.js`를 만들어, 다음과 코드를 작성해 보겠습니다. `MAIN.js`는 UPPERCASE가 프로젝트를 실행할 때 맨 처음 실행하는 코드입니다.

###### MAIN.js
```javascript
Sample.MAIN = METHOD({

	run : () => {
	
		// 하나의 Worker 프로세스에서만 아래 내용을 실행합니다.
		if (CPU_CLUSTERING.getWorkerId() === 1) {
			
			// 모델 생성
			Sample.SomeModel.create({
				name : 'Maru',
				kind : 'dog'
			}, (savedData) => {
				console.log(savedData);
			});
			
			// 모델 생성2
			Sample.SomeModel.create({
				name : 'Pomi'
			});
		}
	}
});
```

프로젝트를 실행합니다. 만약 프로젝트가 실행중이라면 `Ctrl + C`를 눌러 종료한 후 다시 실행합니다.

```
node Sample.js
```

CMD나 터미널에 아래와 같은 내용이 출력되었다면 모델이 잘 정의된 것입니다.

```
2017-04-29 20:24:09 [Sample.SomeModel.create] 경고가 발생했습니다. 경고 메시지: 데이터가 유효하지 않습니다.
다음은 경고를 발생시킨 파라미터입니다.
{
	"data": {
		"name": "Pomi"
	},
	"validErrors": {
		"kind": {
			"type": "notEmpty"
		}
	}
}
{ name: 'Maru',
  kind: 'dog',
  createTime: 2017-04-29T11:24:09.853Z,
  id: '590477d90d1eac1ef875e151' }
```

MongoDB 데이터베이스 관리 툴을 이용해 데이터가 잘 생성되었는지 확인해보시기 바랍니다.

축하합니다! 이제 모델 생성까지 하였습니다. 이제 [튜토리얼 문서](../TUTORIAL.md)에서 각종 튜토리얼들을 살펴보시기 바랍니다.

## 모델의 세부 기능
모델의 세부 기능에 대해서는 [UPPERCASE-MODEL 문서](UPPERCASE-MODEL.md)를 참고하시기 바랍니다.

* [초기화 데이터 설정](UPPERCASE-MODEL.md#초기-데이터-설정)
* [메소드별 설정](UPPERCASE-MODEL.md#메소드별-설정)
* [모델 기능 확장](UPPERCASE-MODEL.md#모델-기능-확장)