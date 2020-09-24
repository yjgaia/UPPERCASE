/*
 * HTML video 태그와 대응되는 클래스
 */
global.VIDEO = CLASS({

	preset: () => {
		return DOM;
	},

	params: () => {
		return {
			tag: 'video'
		};
	},

	init: (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.id			id 속성
		//OPTIONAL: params.cls			class 속성
		//OPTIONAL: params.style		스타일
		//OPTIONAL: params.webm			WebM 동영상 파일 경로
		//OPTIONAL: params.ogg			OGG 동영상 파일 경로
		//OPTIONAL: params.mp4			MP4 동영상 파일 경로
		//OPTIONAL: params.poster		동영상이 로딩 중일 때 표시할 이미지 파일 경로
		//OPTIONAL: params.isNoControls	조작 메뉴를 숨길지 여부
		//OPTIONAL: params.isLoop		반복 재생할지 여부
		//OPTIONAL: params.isMuted		음소거로 재생할지 여부
		//OPTIONAL: params.c			자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.on			이벤트

		let webm = params.webm;
		let ogg = params.ogg;
		let mp4 = params.mp4;
		let poster = params.poster;
		let isNoControls = params.isNoControls;
		let isLoop = params.isLoop;
		let isMuted = params.isMuted;

		if (webm !== undefined && self.getEl().canPlayType('video/webm') !== '') {
			self.getEl().src = webm;
		} else if (ogg !== undefined && self.getEl().canPlayType('video/ogg') !== '') {
			self.getEl().src = ogg;
		} else if (mp4 !== undefined) {
			self.getEl().src = mp4;
		}

		if (isNoControls !== true) {
			inner.setAttr({
				name: 'controls',
				value: 'controls'
			});
		}

		if (isLoop === true) {
			inner.setAttr({
				name: 'loop',
				value: 'loop'
			});
		}

		if (isMuted === true) {
			inner.setAttr({
				name: 'muted',
				value: 'muted'
			});
		}

		let play = self.play = () => {
			self.getEl().play();
		};

		let pause = self.pause = () => {
			self.getEl().pause();
		};

		let stop = self.stop = () => {
			self.getEl().pause();
			self.getEl().currentTime = 0;
		};
	}
});
