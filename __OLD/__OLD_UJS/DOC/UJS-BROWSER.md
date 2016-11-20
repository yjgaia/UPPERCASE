# UJS-BROWSER
웹 브라우저 환경에서 사용할 수 있는 유틸리티 라이브러리 및 DOM(Document Object Model) 템플릿 엔진입니다.

## VIEW 관련 기능
HTML5의 Push State기능을 이용해 Single Page Web Application을 구현할 수 있습니다. 이때 URI를 다루어 뷰를 표현할 수 있도록 하는 기능들입니다.

* `VIEW` 뷰를 만들 수 있는 인터페이스입니다. 이를 상속하여 뷰를 생성합니다. `inner.on` 함수로 뷰에 변화가 생길 때를 감지하여 처리할 수 있습니다. 뷰의 파라미터가 변경되면 `paramsChange`에 설정된 함수가 실행되고, URI 변경되면 `uriChange`에 설정된 함수가 실행되며, 뷰가 종료되면 `close`에 설정된 함수가 실행됩니다. [예제보기](../EXAMPLES/BROWSER/VIEW/VIEW.js)
    
    ```javascript
    var
	// some view
	SomeView = CLASS({

		preset : function() {
			return VIEW;
		},

		init : function(inner, self) {

			// on view.
			console.log('View Opened!');
			
			inner.on('paramsChange', function(params) {
				
				// when change params.
				console.log(params);
			});
			
			inner.on('uriChange', function(uri) {
				
				// when change uri.
				console.log(uri);
			});

			inner.on('close', function() {
			
				// when close.
				console.log('View Closed!');
			});
		}
	})
    ```
    
* `MATCH_VIEW({uri:, target:})` `MATCH_VIEW({uri:, excludeURI:, target:})` `Box.MATCH_VIEW({uri:, target:})` `Box.MATCH_VIEW({uri:, excludeURI:, target:})` URI와 뷰를 매치시킵니다. 현재 URI가 지정한 `uri`와 같으면, VIEW 인터페이스로 만든 뷰가 실행됩니다. `uri`가 패턴일 때 현재 URI가 `excludeURI`면 뷰를 실행하지 않습니다. [예제보기](../EXAMPLES/BROWSER/VIEW/VIEW.js)
    
    ```javascript
    MATCH_VIEW({
		uri : ['view', 'view/{id}'],
		target : SomeView
	})
    ```
    ```javascript
    MATCH_VIEW({
		uri : ['view', 'view/{id}'],
		excludeURI : ['view/1', 'view/2'],
		target : SomeView
	})
    ```

* `URI()` 현재 브라우저의 URI를 반환합니다. [예제보기](../EXAMPLES/BROWSER/VIEW/URI.js)
* `HREF(uri)` `Box.HREF(uri)` URI에 맞는 주소를 생성합니다. [예제보기](../EXAMPLES/BROWSER/VIEW/HREF.js)
* `GO(uri)` `Box.GO(uri)` URI를 변경하여 다른 뷰로 이동합니다. [예제보기](../EXAMPLES/BROWSER/VIEW/GO.js)
    
    ```javascript
    GO('view/123')
    ```

* `GO_NEW_WIN(uri)` `Box.GO_NEW_WIN(uri)` 새 창에서 URI에 맞는 뷰를 띄웁니다. [예제보기](../EXAMPLES/BROWSER/VIEW/GO_NEW_WIN.js)
    
    ```javascript
    GO_NEW_WIN('view/123')
    ```
    
* `REFRESH()` `Box.REFRESH()` `REFRESH(uri)` `Box.REFRESH(uri)` 뷰를 새로 불러옵니다. [예제보기](../EXAMPLES/BROWSER/VIEW/REFRESH.js)
