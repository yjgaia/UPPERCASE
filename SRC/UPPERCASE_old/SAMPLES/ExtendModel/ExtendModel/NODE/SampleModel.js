OVERRIDE(ExtendModel.SampleModel, function(origin) {
	'use strict';

	// 예제 모델을 확장합니다.
	ExtendModel.SampleModel = OBJECT({

		preset : function() {
			return origin;
		},

		init : function(inner, self, params) {
			
			var
			// connection db
			connectionDB = ExtendModel.SHARED_DB('connectionDB');
			
			// 초기화
			connectionDB.save({
				id : 'connectionCount',
				data : {
					count : 0
				}
			});
			
			inner.on('create', {
			
				before : function(data) {
					console.log('모델에 해당하는 데이터를 생성하려 합니다.', data);
				},
				
				after : function(savedData, next, ret) {
					console.log('모델에 해당하는 데이터를 생성하였습니다.', savedData);
				}
			});
			
			ExtendModel.ROOM(self.getName(), function(clientInfo, on) {
				
				console.log('클라이언트가 룸에 접속하였습니다.', clientInfo);
				
				// 새로운 클라이언트 접속 시 count를 1 올림
				connectionDB.update({
					id : 'connectionCount',
					data : {
						$inc : {
							count : 1
						}
					}
				});
				
				// 새 클라이언트가 접속했음을 모든 클라이언트에 알림
				ExtendModel.BROADCAST({
					roomName : self.getName(),
					methodName : 'clientConnected'
				});

				// 클라이언트와의 접속이 끊어질 경우
				on('__DISCONNECTED', function() {
					
					// count를 1 내림
					connectionDB.update({
						id : 'connectionCount',
						data : {
							$inc : {
								count : -1
							}
						}
					});
					
					// 클라이언트가 접속을 끊었음을 모든 클라이언트에 알림
					ExtendModel.BROADCAST({
						roomName : self.getName(),
						methodName : 'clientDisconnected'
					});
				});
				
				// 접속중인 클라이언트 수 전송
				on('getConnectionCount', function(notUsing, ret) {
					ret(connectionDB.get('connectionCount').count);
				});
			});
		}
	});
});
