# `METHOD` ANIMATE
노드에 애니메이션을 지정합니다.

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.node* 애니메이션을 지정할 노드
* `REQUIRED` *params.keyframes* 애니메이션 키 프레임
* `OPTIONAL` *params.duration* 애니메이션 지속 시간 (입력하지 않으면 0.5)
* `OPTIONAL` *params.timingFunction* 애니메이션 작동 방식, 점점 빨라지거나, 점점 느려지거나, 점점 빨라졌다 끝에서 점점 느려지는 등의 처리 (입력하지 않으면 'ease', 'linear', 'ease', 'ease-in', 'ease-out' 사용 가능)
* `OPTIONAL` *params.delay* 애니메이션이 발동하기 전 지연 시간 (입력하지 않으면 0)
* `OPTIONAL` *params.iterationCount* 애니메이션을 몇번 발동시킬지 (입력하지 않으면 1, 계속 애니메이션이 발동되도록 하려면 'infinite' 지정)
* `OPTIONAL` *params.direction* 애니메이션의 방향 (입력하지 않으면 'normal', 'reverse', 'alternate', 'alternate-reverse' 사용 가능)
* `OPTIONAL` *animationEndHandler* 애니메이션이 끝날 때 호출될 핸들러
