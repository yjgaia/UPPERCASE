# 간단한 블로그 만들기
이제, 지금까지 익힌 내용을 바탕으로 간단한 블로그를 만들어 보겠습니다.

## Article 모델
블로그를 만들때는, 간단히 하나의 모델만이 필요로 합니다. 바로 글, 즉 Article 모델입니다. 한번 만들어 보겠습니다.

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

## 뷰 만들기
우선 글을 작성하는 폼 화면부터 만들어 보도록 하겠습니다.

###### Blog/BROWSER/Form.js
글 작성 및 글 수정을 담당하는 폼 뷰 입니다. 아래 코드와 주석을 살펴보시기 바랍니다.
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
		
		// 뷰의 파라미터가 변경될 때 (이 경우에는 {articleId})
		inner.on('paramsChange', function(params) {
		
			var
			// article id
			articleId = params.articleId,
			
			// form
			form = FORM({
				
				c : [
				
				// 제목
				DIV({
					c: [H3({
						c : '제목'
					}), INPUT({
						name : 'title'
					})]
				}),
				
				// 내용
				DIV({
					c: [H3({
						c : '내용'
					}), TEXTAREA({
						name : 'content'
					})]
				}),
				
				// 전송 버튼
				INPUT({
					type : 'submit'
				})],
				
				on : {
					submit : function() {
						
						var
						// data
						data = form.getData();
						
						data.id = articleId;
						
						// articleId가 undefined면 데이터 생성, 아니면 수정
						(articleId === undefined ? Blog.ArticleModel.create : Blog.ArticleModel.update)(data, {
							
							// 데이터 검증 실패
							notValid : function(validErrors) {
								if (validErrors.title !== undefined) {
									if (validErrors.title.type === 'notEmpty') {
										alert('제목을 입력해주세요.');
									} else if (validErrors.title.type === 'size') {
										alert('제목의 길이는 최대 ' + validErrors.title.validParams.max + '글자 입니다.');
									}
								} else if (validErrors.content !== undefined) {
									if (validErrors.content.type === 'notEmpty') {
										alert('내용을 입력해주세요.');
									} else if (validErrors.content.type === 'size') {
										alert('내용의 길이는 최대 ' + validErrors.content.validParams.max + '글자 입니다.');
									}
								}
							},
							
							// 오류 발생
							error : function() {
								alert('오류가 발생하였습니다.');
							},
							
							// 글 작성 완료
							success : function() {
								// 글 목록으로 이동
								Blog.GO('');
							}
						});
					}
				}
			}).appendTo(wrapper);
			
			// article id가 undefined가 아니면 article 데이터를 불러옴
			if (articleId !== undefined) {
				Blog.ArticleModel.get(articleId, form.setData);
			}
		});
		
		// 뷰에서 나가면
		inner.on('close', function() {
			// wrapper 제거
			wrapper.remove();
		});
	}
});
```

###### Blog/BROWSER/List.js
작성된 글 목록을 보는 기능입니다. 아래 코드와 주석을 살펴보시기 바랍니다.
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
			// 글 작성 버튼
			A({
				c : '글 작성',
				on : {
					tap : function() {
						Blog.GO('form');
					}
				}
			}), list = UL()]
		}).appendTo(BODY),
		
		// article watching room, 신규 데이터 감지 및 기존 데이터들을 불러오고 데이터의 변경을 감지하는 룸 생성
		articleWatchingRoom = Blog.ArticleModel.onNewAndFindWatching(function(articleData, addUpdateHandler, addRemoveHandler) {
			
			var
			// origin article dom
			originArticleDom,
			
			// article dom
			articleDom;
			
			// 뷰가 열려있으면 내용 추가
			if (inner.checkIsClosed() !== true) {
				
				// 데이터가 수정된 경우 다시 DOM 생성
				addUpdateHandler(
					// function을 한번 실행하고 해당 function을 다시 반환한다.
					RAR(articleData, function(articleData) {
					
					originArticleDom = articleDom;
					
					// 기존 DOM이 존재하면 기존 돔의 뒤에 새로운 DOM을 만들고 기존 돔을 제거한다.
					// 기존 DOM이 존재하지 않으면 리스트의 맨 처음에 DOM을 만든다.
					(originArticleDom === undefined ? list.prepend : originArticleDom.after)(articleDom = LI({
						style : {
							marginTop : 10
						},
						c : [
						// 제목
						H3({
							c : articleData.title
						}),
						// 내용
						P({
							c : articleData.content
						}),
						// 글 수정 버튼
						A({
							c : '글 수정',
							on : {
								tap : function() {
									Blog.GO('form/' + articleData.id);
								}
							}
						}),
						// 글 삭제 버튼
						A({
							style : {
								marginLeft : 5
							},
							c : '글 삭제',
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
				
				// 데이터가 삭제된 경우 DOM 제거
				addRemoveHandler(function() {
					articleDom.remove();
				});
			}
		});
		
		// 뷰에서 나가면
		inner.on('close', function() {
			// wrapper 제거
			wrapper.remove();
			// article 데이터의 변경을 감지하는 룸에서 나감
			articleWatchingRoom.exit();
		});
	}
});
```

## MAIN.js
MAIN.js는 URI와 각 뷰들을 연결해주는 기능을 합니다.

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

## BOOT 파일 만들기
거의 다 완성되었습니다! 마지막으로 프로젝트 실행을 위한 BOOT 파일인 Blog.js를 만들어 보겠습니다. CONFIG 및 NODE_CONFIG 등 설정에 관한 자세한 정보는 [Configuration](CONFIG.md) 문서를 살펴보시기 바랍니다.

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

## 실행
```
node Blog.js
```

실행 후 브라우저를 켜서 http://localhost:8328 로 접속해 보시기 바랍니다.

간단한 블로그가 완성되었습니다! 다음 문서에서는 블로그에 댓글 기능을 추가하는 것을 실습해 보겠습니다.

다음 문서: [블로그에 댓글 추가하기](ADD_COMMENT_TO_BLOG.md)