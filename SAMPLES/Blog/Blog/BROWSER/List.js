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
					
					// 기존 DOM이 존재하면 기존 DOM 뒤에 새로운 DOM을 만들고 기존 DOM을 제거한다.
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
