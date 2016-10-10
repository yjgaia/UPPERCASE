
### 업로드 폼 예제
`UJS`와 `UPPERCASE-TRANSPORT`를 기반으로 업로드 폼을 만들어 보겠습니다.
```html
<!-- import UJS -->
<script src="UJS-BROWSER.js"></script>
<script>
	BROWSER_CONFIG.fixScriptsFolderPath = 'UJS-BROWSER-FIX';
	LOAD('UJS-BROWSER-FIX/FIX.js');
</script>

<!-- import UPPERCASE-TRANSPORT -->
<script src="UPPERCASE-TRANSPORT/BROWSER.js"></script>

<script>
	READY(function() {
	
    	// init all singleton classes.
		INIT_OBJECTS();
		
		var
		// wrapper
		wrapper = DIV({
			c : [
			
			// 업로드가 완료되면 이곳에 파일 정보가 출력됩니다.
			IFRAME({
			    name : '__UPLOAD_FORM'
			}),
			
			// 업로드 폼
			FORM({
				action : 'http://' + BROWSER_CONFIG.host + ':' + BROWSER_CONFIG.port + '/__UPLOAD',
				target : '__UPLOAD_FORM',
				method : 'POST',
				enctype : 'multipart/form-data',
				c : [ input = INPUT({
					type : 'file',
					name : 'file',
					isMultiple : true
				}), INPUT({
				    type : 'submit'
				})]
			})]
		}).appendTo(BODY)
	});
</script>
```
