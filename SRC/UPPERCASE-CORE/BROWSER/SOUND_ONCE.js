/*
 * 사운드 파일을 한번 재생하는 SOUND_ONCE 클래스
 */
global.SOUND_ONCE = CLASS({

	preset : () => {
		return SOUND;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.ogg
		//OPTIONAL: params.mp3
		//OPTIONAL: params.isLoop
		//OPTIONAL: params.gain

		self.play();
	}
});
