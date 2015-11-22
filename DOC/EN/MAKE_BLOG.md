# Simple Blog Example
From what we've learned, lets build a simple blog.

## Article Model
Creating Blog in this example requires only one Model called "Article".

###### Blog/COMMON/ArticleModel.js
```javascript
Blog.ArticleModel = OBJECT({

	preset : function() {
		'use strict';

		return Blog.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			
			title : {
				notEmpty : true,
				size : {
					max : 255
				}
			},
			
			content : {
				notEmpty : true,
				size : {
					max : 10000
				}
			}
		};

		return {
			name : 'Article',
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

## View
Now lets build a form screen where we can type inputs.

###### Blog/BROWSER/Form.js
This is form view which allows users to write and edit. Please look closely to the comments.

```javascript
Blog.Form = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// wrapper
		wrapper = DIV().appendTo(BODY);
		
		// When parameter of view changes ({articleId} for this example)
		inner.on('paramsChange', function(params) {
		
			var
			// article id
			articleId = params.articleId,
			
			// form
			form = FORM({
				
				c : [
				
				// Title
				DIV({
					c: [H3({
						c : 'title'
					}), INPUT({
						name : 'title'
					})]
				}),
				
				// content
				DIV({
					c: [H3({
						c : 'content'
					}), TEXTAREA({
						name : 'content'
					})]
				}),
				
				// submit button
				INPUT({
					type : 'submit'
				})],
				
				on : {
					submit : function() {
						
						var
						// data
						data = form.getData();
						
						data.id = articleId;
						
						// create if articleId is undefined, else edit
						(articleId === undefined ? Blog.ArticleModel.create : Blog.ArticleModel.update)(data, {
							
							// Data is invalid
							notValid : function(validErrors) {
								if (validErrors.title !== undefined) {
									if (validErrors.title.type === 'notEmpty') {
										alert('Please Enter Title.');
									} else if (validErrors.title.type === 'size') {
										alert('Maximum length of title is ' + validErrors.title.validParams.max + '.');
									}
								} else if (validErrors.content !== undefined) {
									if (validErrors.content.type === 'notEmpty') {
										alert('Please Enter Content.');
									} else if (validErrors.content.type === 'size') {
										alert('Maximum length of content is ' + validErrors.content.validParams.max + '.');
									}
								}
							},
							
							// error occured
							error : function() {
								alert('Error Occured.');
							},
							
							// Writing Done
							success : function() {
								// Go back to list
								Blog.GO('');
							}
						});
					}
				}
			}).appendTo(wrapper);
			
			// if article id is undefined call article
			if (articleId !== undefined) {
				Blog.ArticleModel.get(articleId, form.setData);
			}
		});
		
		// if one gets out of view
		inner.on('close', function() {
			// remove wrapper
			wrapper.remove();
		});
	}
});
```

###### Blog/BROWSER/List.js
Function to List of written articles. Please read the code and comment carefully.
```javascript
Blog.List = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// list
		list,
		
		// wrapper
		wrapper = DIV({
			c : [
			
			// Write Button
			A({
				c : 'Write',
				on : {
					tap : function() {
						Blog.GO('form');
					}
				}
			}),
			
			// Article List
			list = UL()]
		
		}).appendTo(BODY),
		
		// article watching room, it detacts any changes and imports previous data.
		articleWatchingRoom = Blog.ArticleModel.onNewAndFindWatching(function(articleData, addUpdateHandler, addRemoveHandler) {
			
			var
			// origin article dom
			originArticleDom,
			
			// article dom
			articleDom;
			
			// add content if view is open
			if (inner.checkIsClosed() !== true) {
				
				// create dom again if data is collected.
				addUpdateHandler(
					// excute function once and return function it self.
					RAR(articleData, function(articleData) {
					
					originArticleDom = articleDom;
					
					// if previous DOM exists make new DOM after the previous one and delete the previous one.
					// If previous DOM does not exist create DOM in the very beginning of the list.
					(originArticleDom === undefined ? list.prepend : originArticleDom.after)(articleDom = LI({
						style : {
							marginTop : 10
						},
						c : [
						// Title
						H3({
							c : articleData.title
						}),
						// Content
						P({
							c : articleData.content
						}),
						// Edit Button
						A({
							c : 'Edit Article',
							on : {
								tap : function() {
									Blog.GO('form/' + articleData.id);
								}
							}
						}),
						// Delete Button
						A({
							style : {
								marginLeft : 5
							},
							c : 'Delete',
							on : {
								tap : function() {
									Blog.ArticleModel.remove(articleData.id);
								}
							}
						})]
					}));
					
					if (originArticleDom !== undefined) {
						originArticleDom.remove();
					}
				}));
				
				// Delete DOM when data is deleted
				addRemoveHandler(function() {
					articleDom.remove();
				});
			}
		});
		
		// If view is closed
		inner.on('close', function() {
			// remove wrapper
			wrapper.remove();
			// exit the article watching room
			articleWatchingRoom.exit();
		});
	}
});
```

## MAIN.js
MAIN.js connects each URI and views.

###### Blog/BROWSER/MAIN.js
```javascript
Blog.MAIN = METHOD({
	
	run : function() {
		'use strict';
		
		Blog.MATCH_VIEW({
			uri : '',
			target : Blog.List
		});
		
		Blog.MATCH_VIEW({
			uri : ['write', 'update/{articleId}'],
			target : Blog.Form
		});
	}
});
```

## Create BOOT file
We're almost done! Lastly we need to make Blog.js, a BOOT file needed to initiate the project. Please refer to [Configuration](CONFIG.md) document for more information on CONFIG, NODE_CONFIG and other configurations.

###### Blog.js
```javascript
require(process.env.UPPERCASE_IO_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
        isDevMode : true,
		defaultBoxName : 'Blog',
        title : 'Blog',
		webServerPort : 8328
	},
	NODE_CONFIG : {
		dbName : 'Blog'
	}
});
```

## Execute
```
node Blog.js
```

After that, go to http://localhost:8328 to access your blog.
You will be able to see that the site fetches the list of articles using `onNewAndFindWatching` function of `MODEL` and automatically updates when new article is added.

We are done with the simple blog project! We will add authorization feature to our simple blog on the next document.

Next Up: [Add Authorization to Blog](ADD_AUTH_TO_BLOG.md)