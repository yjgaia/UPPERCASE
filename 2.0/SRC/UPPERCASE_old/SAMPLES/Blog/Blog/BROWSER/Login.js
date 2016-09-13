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