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
