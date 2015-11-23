# 블로그에 인증 추가하기
이전 문서에서 만든 블로그에 아무나 글을 쓸 수 없도록 인증 기능을 추가해 보겠습니다.

## 비밀번호 설정 추가하기
Blog.js에 비밀번호 설정을 추가합니다. 웹 브라우저에서 보여지면 안되기 때문에 `NODE_CONFIG`에 아래와 같은 내용을 작성합니다.

```javascript
Blog : {
	password : '1234'
}
```

최종적으로 완성된 Blog.js 파일은 다음과 같습니다.

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
		dbName : 'Blog',
		Blog : {
			password : '1234'
		}
	}
});
```

## 로그인을 처리하는 로직 만들기
UPPERCASE의 `ROOM` 기능을 이용하여 로그인을 처리하는 로직을 만들어 보겠습니다.

###### Blog/NODE/AuthRoom.js
`auth` 메소드로 넘어온 `password`와 `NODE_CONFIG.Blog.password`를 비교하여 같으면 `ADMIN` 롤을 `clientInfo`에 삽입하므로써 로그인을 처리합니다.
```javascript
Blog.AuthRoom = OBJECT({
	
	init : function() {
		'use strict';
		
		Blog.ROOM('authRoom', function(clientInfo, on, off) {
			
			on('auth', function(password, ret) {
				
				// 비밀번호가 같습니다. 운영자입니다!
				if (password === NODE_CONFIG.Blog.password) {
					clientInfo.roles = ['ADMIN'];
					ret(true);
				}
				
				// 비밀번호가 다릅니다.
				else {
					ret(false);
				}
			});
		});
	}
});
```

## 로그인 페이지 만들기
로직을 만들었으니 로그인 페이지를 만들어 보겠습니다.

###### Blog/BROWSER/Login.js
비밀번호 입력칸과 submit 버튼을 만듭니다. 
```javascript
Blog.Login = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';

		var
		// auth room
		authRoom = Blog.ROOM('authRoom'),
		
		// wrapper
		wrapper = DIV({
			c : FORM({
				
				c : [
				
				// 비밀번호
				DIV({
					c: [H3({
						c : '비밀번호'
					}), INPUT({
						type : 'password',
						name : 'password'
					})]
				}),

				// 전송 버튼
				INPUT({
					style : {
						marginTop : 10
					},
					type : 'submit'
				})],
				
				on : {
					submit : function(e, form) {
						
						var
						// data
						data = form.getData();
						
						// auth room의 auth 메소드로 인증을 시도함
						authRoom.send({
							methodName : 'auth',
							data : data.password
						}, function(isAuthed) {
							
    						// 비밀번호가 같습니다. 운영자입니다!
							if (isAuthed === true) {
								
								// 글 목록으로 이동
								Blog.GO('');
							}
							
							// 비밀번호가 다릅니다.
							else {
								alert('비밀번호가 다릅니다.');
							}
						});
					}
				}
			})
		}).appendTo(BODY);
		
		inner.on('close', function() {
			
			authRoom.exit();
			
			wrapper.remove();
		});
	}
});
```

로그인 화면을 만들었다면, MAIN.js에서 URI와 연결합니다.
###### Blog/BROWSER/MAIN.js 내용 중
```javascript
Blog.MAIN = METHOD({
	
	run : function() {
		'use strict';
		
		Blog.MATCH_VIEW({
			uri : '',
			target : Blog.List
		});
		
		Blog.MATCH_VIEW({
			uri : ['form', 'form/{articleId}'],
			target : Blog.Form
		});
		
		Blog.MATCH_VIEW({
			uri : 'login',
			target : Blog.Login
		});
	}
});
```

이제 로그인 버튼으로 이동하는 버튼을 List.js에 만듭니다.
###### Blog/BROWSER/List.js 내용 중
```javascript
...

wrapper = DIV({
	c : [
	
	// 글 작성 버튼
	A({
		c : '글 작성',
		on : {
			tap : function() {
				Blog.GO('form');
			}
		}
	}),
	
	// 로그인 버튼
	A({
		style : {
			marginLeft : 5
		},
		c : '로그인',
		on : {
			tap : function() {
				Blog.GO('login');
			}
		}
	}),
	
	// 글 목록
	list = UL()]
	
}).appendTo(BODY),

...
```

이제 실제로 인증이 되었을 경우에만 글 저장이 가능하도록 기능을 추가해 보겠습니다.

## 인증이 되었을 경우에만 글 저장이 가능하도록 기능 추가
인증이 되었을 경우에만 글 저장 및 수정, 삭제가 가능하도록 하기 위해서는 단순히 MODEL에 `role`을 추가하기만 하면 됩니다. 아래와 같이 `create`, `update`, `remove` 설정에 `role : 'ADMIN'`을 추가합니다.
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
					valid : VALID(validDataSet),
					role : 'ADMIN'
				},
				update : {
					valid : VALID(validDataSet),
					role : 'ADMIN'
				},
				remove : {
					role : 'MASTER'
				}
			}
		};
	}
});
```

이제 다시 프로젝트를 껐다가 실행해보면, 로그인 하지 않은 상태에서는 폼 화면에서 글쓰기 버튼이 작동하지 않는것을 알 수 있습니다.

인증 기능이 추가된 블로그 까지 만들어 보았으니 UPPERCASE의 기본적인 내용은 모두 익혔습니다. 이제 UPPERCASE가 제공하는 기능들을 하나씩 살펴보도록 하겠습니다.

다음 문서: [UPPERCASE가 제공하는 기능들 살펴보기](OVERVIEW.md)