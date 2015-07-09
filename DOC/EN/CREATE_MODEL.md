# Create Model
UPPERCASE.IO follows Model-View pattern. You will learn how to create and use Model part in this document.

## Run MongoDB
UPPERCASE.IO uses MongoDB as Database. You can execute MongoDB in console or terminal.

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

## Database Configuration
Open a file where `BOOT` code is located and write configurations to execute the project.

```javascript
require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'Sample',
        title : 'Sample',
		webServerPort : 8888
	},
	NODE_CONFIG : {
	    // Database Configuration
		// Database Name for this example is "Sample".
		dbName : 'Sample'
	}
});
```

## Start Writing Model Codes
Now we can start working on our Model. Under COMMON folder, create SomeModel.js. At this moment, I used VALID functions in UPPERCASE.js for data validation. So please be aware.

###### SomeModel.js
```javascript
Sample.SomeModel = OBJECT({

	preset : function() {
		'use strict';

		// 모델은 각 BOX에 할당되어 있는 MODEL을 상속하여 만듭니다.??
		return Sample.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			
			// KIND
			kind : {
				// Input is Required
				notEmpty : true,
				// And input must be one of them.
				one : ['dog', 'pig', 'cow']
			},
			
			// NAME
			name : {
				// Input is Required
				notEmpty : true,
				// And input should be between minimum of 2 and maximum of 10.
				size : {
					min : 2,
					max : 10
				}
			}
		};

		return {
			// Model Name
			name : 'Some',
			// Configure functions of Model
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

## Confirm that Model Works Properly
모델 작동을 확인하기 위해 프로젝트의 NODE 폴더 이하에 MAIN.js를 만들어, 다음과 같은 코드를 추가해 보겠습니다. MAIN.js는 UPPERCASE.IO가 프로젝트 부팅 시 맨 처음 실행하는 코드입니다.

###### MAIN.js
```javascript
Sample.MAIN = METHOD({

	run : function() {
		'use strict';
		
		// 멀티 코어 CPU에서 하나의 코어에서만 아래 내용 실행
		if (CPU_CLUSTERING.getWorkerId() === 1) {
			
			// 부팅 후 1초 후에 실행
			DELAY(1, function() {
				
				// Create Model
				Sample.SomeModel.create({
					name : 'Maru',
					kind : 'dog'
				}, function(savedData) {
					console.log(savedData);
				});
				
				// Create Model2
				Sample.SomeModel.create({
					name : 'Pomi'
				});
			});
		}
	}
});
```

Now execute project. If project is already running, stop the server with `Ctrl + C` and execute again.

```
node Sample.js
```

If you see logs like below in your console or terminal, you successfully created a Model!

```
[UPPERCASE.IO-MODEL] `Sample.Some/create` NOT VALID. { kind: { type: 'notEmpty', value: undefined } }
{ name: 'Maru',
  kind: 'dog',
  createTime: Thu Mar 26 2015 13:35:30 GMT+0900,
  id: '55138c9298bf39e806ffd616' }
```

Use mongodb management tools such as [Robomongo](http://www.robomongo.org) to see if the data is created.

Next Up: [Make Simple Blog](MAKE_BLOG.md)