# Create Project
This document is for users who have general understanding of Javascript and Web Development. Please note that the Sample Project made in this article is generated in [Sample folder](https://github.com/Hanul/UPPERCASE.IO/tree/master/Sample).

## Create Project Folder
1. Create Project Folder in proper place (can be anywhere).
2. Create BOX folder within Project folder. **BOX is equilvalent to module in UPPERCASE.IO**. Please refer to [this document](BOX.md) for more explanation on BOX. I named BOX folder `Sample` in this Example.
2. Create sub-folders within Sample(box) folder.
	* `NODE` contains codes for Node.js Server.
	* `BROWSER` contains codes for clients.
	* `COMMON` contains codes for both Server and Client.
	* `R` contains resources for web application.
3. Create a JS file for starting server in project folder(Not Box folder!). Usually they are named after project folder name. In here we call it `Sample.js`.

The complete structure will look like below.

```
Sample
	Sample
    	BROWSER
        COMMON
        NODE
        R
    Sample.js
```

## Start Development
1. Open text editor for JavaScript. If you don't have any I recommand, [Aptana Studio](http://www.aptana.com) or [Sublime Text](http://www.sublimetext.com).
2. Learn code conventions. Please follow [UPPERCASE.JS way](https://github.com/Hanul/UPPERCASE.JS/blob/master/DOC/KR/CONVENTION.md).
3. After learning coding conventions, write codes to start the project.

## Writing Codes to Start the Project (Sample.js in this example)
Write Sample.js like below. `UPPERCASE_IO_PATH environment variable` must be set before starting the project. If you haven't done it before, please refer to [INSTALL](INSTALL.md).

```javascript
// import BOOT.js from UPPERCASE.IO.
require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

// BOOT UPPERCASE.IO.
BOOT({
	CONFIG : {
		// BOOT in development mode.
        isDevMode : true,
        // the default box is 'Sample' BOX.
		defaultBoxName : 'Sample',
		// Give Project title.
        title : 'Sample',
        // open web server port.
		webServerPort : 8888
	}
});
```

import BOOT.js and run BOOT method. Set CONFIG to configure UPPERCASE.IO. Please refer [this document](CONFIG.md) for more on CONFIG.

## Start Project
Type in the code below in console or terminal.

```
node Sample.js
```

If you see the screen like below, the project is successfully started.

```
[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER... (PORT:8888)
[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER... (PORT:8888)
[UPPERCASE.IO-WEB_SOCKET_SERVER] RUNNING WEB SOCKET SERVER...
[UPPERCASE.IO-WEB_SOCKET_FIX_REQUEST_MANAGER] RUNNING WEB SOCKET FIX REQUEST MANAGER...
[UPPERCASE.IO] <2015-3-8 18:25:53> `Sample` WORKER #1 BOOTed! => http://localhost:8888
[UPPERCASE.JS-CPU_CLUSTERING] RUNNING WORKER... (ID:1)
...
```

If you see a black screen when accessed http://localhost:8888, all preparation for development is done. (Black background is default style in UPPERCASE.IO.)

## Hellow World Example (Actually, Hello UPPERCASE.IO!)
Before diving into this procedure, please be informed the basics of [UPPERCASE.JS](UPPERCASE.JS.md) and [BOX](BOX.md).

Now we are going to make basic screen saying Hello, UPPERCASE.IO!. Create `MAIN.js` and `HOME.js` files under `BROWSER folder`.

* `MAIN.js` is what UPPERCASE.IO initiates the very beginning.

    ```javascript
    // create MAIN method.
    Sample.MAIN = METHOD({
    
    	run : function() {
    		'use strict';
    		// Accessing '' generates Home view
    		Sample.MATCH_VIEW({
    			uri : '',
    			target : Sample.Home
    		});
    	}
    });
    ```

* `Home.js` is a view file for home uri.

    ```javascript
    Sample.Home = CLASS({
    
    	preset : function() {
    		'use strict';
    
    		return VIEW;
    	},
    
    	init : function(inner, self) {
    		'use strict';
    
    		var
    		// div
    		div = DIV({
    			c : 'Hello, UPPERCASE.IO!'
    		}).appendTo(BODY);
    		
    		inner.on('close', function() {
    			div.remove();
    		});
    	}
    });
    ```

Press `Ctrl + C` to exit currently operating Sample.js. And turn it on again, then you will see `Hello, UPPERCASE.IO!` in your http://localhost:8080.

Congratulations! You just successfully made your first UPPERCASE.IO project! Now go to [Create Model](CREATE_MODEL.md) to learn about model, the foundation of project.

Next Up: [Create Model](CREATE_MODEL.md)
