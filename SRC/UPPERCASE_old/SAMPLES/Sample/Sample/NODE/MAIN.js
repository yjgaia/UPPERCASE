Sample.MAIN = METHOD({

	run : function() {
		'use strict';
		
		// 멀티 코어 CPU에서 하나의 코어에서만 아래 내용 실행
		if (CPU_CLUSTERING.getWorkerId() === 1) {
			
			// 부팅 후 1초 후에 실행
			DELAY(1, function() {
				
				// 모델 생성
				Sample.SomeModel.create({
					name : 'Maru',
					kind : 'dog'
				}, function(savedData) {
					console.log(savedData);
				});
				
				// 모델 생성2
				Sample.SomeModel.create({
					name : 'Pomi',
					kind : 'dog'
				});
			});
		}
	}
});
