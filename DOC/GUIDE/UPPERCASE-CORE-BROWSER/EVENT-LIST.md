# UPPERCASER가 지원하는 이벤트 목록

## 윈도우 관련 이벤트
```javascript
EVENT('resize', () => {
	console.log('윈도우 크기 변경: ' + WIN_WIDTH() + 'x' + WIN_HEIGHT());
});
```
- `resize` 윈도우의 크기가 변경되면 발생하는 이벤트
- `scroll` 화면을 스크롤할 때 발생하는 이벤트

## DOM 관련 이벤트
```javascript
EVENT({
	node : img
	name : 'load'
}, () => {
	console.log('이미지 로딩 완료. 이미지 크기: ' + img.getWidth() + 'x' + img.getHeight());
});
```
- `attach` 현재 DOM이 다른 DOM에 추가될 때 발생하는 이벤트
- `show` DOM을 `hide`로 숨긴 상태에서 `show`로 다시 보여질 때 발생하는 이벤트
- `remove` 현재 DOM이 제거될 때 발생하는 이벤트
- `load` `IMG`나 `IFRAME`에서 로딩이 완료되었을 때 발생하는 이벤트
- `scroll` `overflow` 스타일이 `scroll`로 지정되어 DOM 내 스크롤 바가 생긴 경우 스크롤할 때 발생하는 이벤트
- `drop` 외부 파일을 드래그하여 DOM 내에 드롭 할 때 발생하는 이벤트

## 마우스 관련 이벤트
```javascript
EVENT({
	node : div
	name : 'tap'
}, (e) => {
	console.log('터치 발생: ' + e.getLeft() + 'x' + e.getTop());
});
```
- `tap` 윈도우나 DOM을 터치할 때 발생하는 이벤트
- `doubletap` 윈도우나 DOM을 더블 터치할 때 발생하는 이벤트
- `touchstart` 윈도우나 DOM에 터치를 시작할 때 발생하는 이벤트
- `touchmove` 윈도우나 DOM에 터치를 한 상태에서 손가락이나 마우스를 움직이면 발생하는 이벤트
- `touchend` 윈도우나 DOM으로부터 터치를 떼면 발생하는 이벤트
- `mouseover` DOM에 마우스를 가져다대면 발생하는 이벤트
- `mouseout` DOM으로부터 마우스가 떠날 때 발생하는 이벤트

## 폼 관련 이벤트
```javascript
EVENT({
	node : input
	name : 'keydown'
}, (e) => {
	console.log('키가 눌려짐: ' + e.getKey());
});
```
- `focus` 입력 칸([`INPUT`](../UPPERCASE-CORE-BROWSER.md#input), [`TEXTAREA`](../UPPERCASE-CORE-BROWSER.md#textarea))이 활성화되어 입력을 대기할 때 발생하는 이벤트
- `blur` 입력 칸이 비활성화되어 더 이상 입력을 받지 않을 때 발생하는 이벤트
- `keydown` 입력 칸에서 키보드의 키를 누르면 발생하는 이벤트
- `keyup` 입력 칸에서 키보드의 키를 떼면 발생하는 이벤트
- `change` 입력 칸의 값이 변경되면 발생하는 이벤트
- `select` [선택 칸](../UPPERCASE-CORE-BROWSER.md#select)이 선택되면 발생하는 이벤트
- `submit` [폼](../UPPERCASE-CORE-BROWSER.md#form)을 전송하면 발생하는 이벤트