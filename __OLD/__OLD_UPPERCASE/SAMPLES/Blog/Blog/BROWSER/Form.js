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
