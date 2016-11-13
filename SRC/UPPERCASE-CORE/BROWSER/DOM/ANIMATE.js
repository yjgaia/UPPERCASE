/**
 * 노드에 애니메이션을 지정합니다.
 */
global.ANIMATE = METHOD(function(m) {
	'use strict';
	
	var
	// keyframes count
	keyframesCount = 0;
	
	return {
		
		run : function(params, animationEndHandler) {
			//REQUIRED: params
			//REQUIRED: params.node				애니메이션을 지정할 노드
			//REQUIRED: params.keyframes		애니메이션 키 프레임
			//OPTIONAL: params.duration			애니메이션 지속 시간 (입력하지 않으면 0.5)
			//OPTIONAL: params.timingFunction	애니메이션 작동 방식, 점점 빨라지거나, 점점 느려지거나, 점점 빨라졌다 끝에서 점점 느려지는 등의 처리 (입력하지 않으면 'ease', 'linear', 'ease', 'ease-in', 'ease-out' 사용 가능)
			//OPTIONAL: params.delay			애니메이션이 발동하기 전 지연 시간 (입력하지 않으면 0)
			//OPTIONAL: params.iterationCount	애니메이션을 몇번 발동시킬지 (입력하지 않으면 1, 계속 애니메이션이 발동되도록 하려면 'infinite' 지정)
			//OPTIONAL: params.direction		애니메이션의 방향 (입력하지 않으면 'normal', 'reverse', 'alternate', 'alternate-reverse' 사용 가능)
			//OPTIONAL: animationEndHandler		애니메이션이 끝날 때 호출될 핸들러
	
			var
			// node
			node = params.node,
	
			// keyframes
			keyframes = params.keyframes,
			
			// duration
			duration = params.duration === undefined ? 0.5 : params.duration,
			
			// timing function
			timingFunction = params.timingFunction === undefined ? 'ease' : params.timingFunction,
			
			// delay
			delay = params.delay === undefined ? 0 : params.delay,
			
			// iteration count
			iterationCount = params.iterationCount === undefined ? 1 : params.iterationCount,
			
			// direction
			direction = params.direction === undefined ? 'normal' : params.direction,
			
			// keyframes name
			keyframesName = '__KEYFRAMES_' + keyframesCount,
			
			// keyframes str
			keyframesStr = '',
			
			// keyframes start style
			keyframesStartStyle,
			
			// keyframes final style
			keyframesFinalStyle,
			
			// keyframes style el
			keyframesStyleEl;
			
			keyframesCount += 1;
			
			EACH(keyframes, function(style, key) {
				
				keyframesStr += key + '{';
	
				EACH(style, function(value, name) {
	
					if (typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
						value = value + 'px';
					}
	
					keyframesStr += name.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + value + ';';
				});
	
				keyframesStr += '}';
	
				if (key === 'from' || key === '0%') {
					keyframesStartStyle = style;
				} else if (key === 'to' || key === '100%') {
					keyframesFinalStyle = style;
				}
			});
			
			// create keyframes style element.
			keyframesStyleEl = document.createElement('style');
			keyframesStyleEl.type = 'text/css';
			keyframesStyleEl.appendChild(document.createTextNode('@keyframes ' + keyframesName + '{' + keyframesStr + '}'));
			document.getElementsByTagName('head')[0].appendChild(keyframesStyleEl);
			
			node.addStyle(keyframesStartStyle);
			
			node.addStyle({
				animation : keyframesName + ' ' + duration + 's ' + timingFunction + ' ' + delay + 's ' + iterationCount + ' ' + direction
			});
			
			node.addStyle(keyframesFinalStyle);
	
			if (animationEndHandler !== undefined && iterationCount === 1) {
	
				DELAY(duration, function() {
					animationEndHandler(node);
				});
			}
		}
	};
});

