OVERRIDE(ExtendModel.SampleModel, function(origin) {
	'use strict';

	// 예제 모델을 확장합니다.
	ExtendModel.SampleModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			
			var
			// room
			room = self.getRoom(),
			
			// get connection count.
			getConnectionCount;
			
			room.on('clientConnected', function() {
				
				DIV({
					c : '새 클라이언트가 접속하였습니다.'
				}).appendTo(BODY);
			});
			
			room.on('clientDisconnected', function() {
				
				DIV({
					c : '클라이언트가 접속을 종료하였습니다.'
				}).appendTo(BODY);
			});
			
			self.getConnectionCount = getConnectionCount = function(callback) {
				//REQUIRED: callback
				
				room.send('getConnectionCount', callback);
			};
			
			A({
				style : {
					textDecoration : 'underline'
				},
				c : '유저 수를 확인합니다.',
				on : {
					tap : function() {
						
						getConnectionCount(function(count) {
							
							DIV({
								c : '총 ' + count + '개의 클라이언트가 접속중입니다.'
							}).appendTo(BODY);
						});
					}
				}
			}).appendTo(BODY);
		}
	});
});
