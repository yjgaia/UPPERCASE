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

		// Model in Box is inherited to the model.
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
In order to confirm that our model works, I made MAIN.js under NODE folder and added the code below. MAIN.js is what UPPERCASE.IO executes first when booted.

###### MAIN.js
```javascript
Sample.MAIN = METHOD({

	run : function() {
		'use strict';
		
		// Use the code below only under multicore CPU environment
		if (CPU_CLUSTERING.getWorkerId() === 1) {
			
			// Execute a second later when booted
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