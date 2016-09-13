Sample.SomeModel = OBJECT({

	preset : function() {
		'use strict';

		// 모델은 각 BOX에 할당되어 있는 MODEL을 상속하여 만듭니다.
		return Sample.MODEL;
	},

	params : function() {
		'use strict';

		var
		// valid data set
		validDataSet = {
			
			// 종류
			kind : {
				// 필수 입력
				notEmpty : true,
				// 아래 값들 중 하나여야 함
				one : ['dog', 'pig', 'cow']
			},
			
			// 이름
			name : {
				// 필수 입력
				notEmpty : true,
				// 최소 2글자에서 최대 10글자까지 작성 가능
				size : {
					min : 2,
					max : 10
				}
			}
		};

		return {
			// 모델 명
			name : 'Some',
			// 모델의 기능들에 대한 설정
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
