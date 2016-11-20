/**
 * HTML audio 태그와 대응되는 클래스
 */
global.AUDIO = CLASS({

	preset : function() {
		'use strict';

		return DOM;
	},

	params : function() {
		'use strict';

		return {
			tag : 'audio'
		};
	},

	init : function(inner, self, params) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.id		id 속성
		//OPTIONAL: params.cls		class 속성
		//OPTIONAL: params.style	스타일
		//OPTIONAL: params.ogg		OGG 사운드 파일 경로
		//OPTIONAL: params.mp3		MP3 사운드 파일 경로
		//OPTIONAL: params.isLoop	반복 재생할지 여부
		//OPTIONAL: params.c		자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on		이벤트

		var
		// mp3
		mp3 = params.mp3,

		// ogg
		ogg = params.ogg,
		
		// is loop
		isLoop = params.isLoop,
		
		// play.
		play,
		
		// pause.
		pause,
		
		// stop.
		stop;
		
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
		
		self.play = play = function() {
			self.getEl().play();
		};
		
		self.pause = pause = function() {
			self.getEl().pause();
		};
		
		self.stop = stop = function() {
			self.getEl().pause();
			self.getEl().currentTime = 0;
		};
	}
});
