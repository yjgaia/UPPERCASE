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

### BROWSER/Form.js

### BROWSER/List.js

### BROWSER/MAIN.js

## BOOT 파일 만들기

## 실행

간단한 블로그가 완성되었습니다! 다음 문서에서는 블로그에 댓글 기능을 추가하는 것을 실습해 보겠습니다.

다음 문서: [블로그에 댓글 추가하기]()