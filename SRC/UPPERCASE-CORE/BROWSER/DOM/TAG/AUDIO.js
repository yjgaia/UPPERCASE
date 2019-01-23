/*
 * HTML audio 태그와 대응되는 클래스
 */
global.AUDIO = CLASS({

	preset : () => {
		return DOM;
	},

	params : () => {
		return {
			tag : 'audio'
		};
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.ogg		OGG 사운드 파일 경로
		//OPTIONAL: params.mp3		MP3 사운드 파일 경로
		//OPTIONAL: params.isLoop	반복 재생할지 여부
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		let mp3 = params.mp3;
		let ogg = params.ogg;
		let isLoop = params.isLoop;
		
		if (ogg !== undefined && self.getEl().canPlayType('audio/ogg') !== '') {
			self.getEl().src = ogg;
		} else if (mp3 !== undefined) {
			self.getEl().src = mp3;
		}
		
		inner.setAttr({
			name : 'controls',
			value : 'controls'
		});
		
		if (isLoop === true) {
			inner.setAttr({
				name : 'loop',
				value : 'loop'
			});
		}
		
		let play = self.play = () => {
			self.getEl().play();
		};
		
		let pause = self.pause = () => {
			self.getEl().pause();
		};
		
		let stop = self.stop = () => {
			pause();
			self.getEl().currentTime = 0;
		};
	}
});
