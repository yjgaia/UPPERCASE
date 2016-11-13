# UJS-BROWSER
웹 브라우저 환경에서 사용할 수 있는 유틸리티 라이브러리 및 DOM(Document Object Model) 템플릿 엔진입니다.

## 사운드 관련 기능
* `SOUND({mp3:, ogg:, isLoop:})` 사운드를 재생하는 클래스입니다. `play`로 사운드를 재생하고 `stop`으로 재생을 멈춥니다. [예제보기](../EXAMPLES/BROWSER/SOUND.js)

    ```javascript
    var
    // sound
    sound = SOUND({
        // mp3 file path
        mp3 : 'test.mp3',
        // ogg file path
        ogg : 'test.ogg',
        // play loop
        isLoop : true
    });
    
    sound.play()
    
    sound.stop()
    ```

## AJAX 요청 관련 기능
* `REQUEST` `Box.REQUEST` AJAX 요청을 보냅니다. [예제보기](../EXAMPLES/BROWSER/REQUEST/REQUEST.js)
    * `REQUEST({method:, uri:}, responseListenerOrListeners)`
    * `REQUEST({method:, uri:, paramStr:}, responseListenerOrListeners)`
    * `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)`

    ```javascript
    REQUEST({
		host : 'localhost',
		port : 8810,
		method : 'GET',
		uri : 'AJAX_TEST'
	}, function(content) {
		...
	})
	```
	
* `GET` `Box.GET` `method`가 `GET`인 AJAX 요청을 보냅니다. [예제보기](../EXAMPLES/BROWSER/REQUEST/GET.js)
    * `GET(uri, responseListenerOrListeners)`
    * `GET({uri:, paramStr:}, responseListenerOrListeners)`
    * `GET({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

    ```javascript
    GET({
		host : 'localhost',
		port : 8810,
		uri : 'AJAX_TEST'
	}, function(content) {
		...
	})
	```
	
* `POST` `Box.POST` `method`가 `POST`인 AJAX 요청을 보냅니다. [예제보기](../EXAMPLES/BROWSER/REQUEST/POST.js)
    * `POST(uri:, responseListenerOrListeners)`
    * `POST({uri:, paramStr:}, responseListenerOrListeners)`
    * `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `PUT` `Box.PUT` `method`가 `PUT`인 AJAX 요청을 보냅니다. [예제보기](../EXAMPLES/BROWSER/REQUEST/PUT.js)
    * `PUT(uri:, responseListenerOrListeners)`
    * `PUT({uri:, paramStr:}, responseListenerOrListeners)`
    * `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `DELETE` `Box.DELETE` `method`가 `DELETE`인 AJAX 요청을 보냅니다. [예제보기](../EXAMPLES/BROWSER/REQUEST/DELETE.js)
    * `DELETE(uri:, responseListenerOrListeners)`
    * `DELETE({uri:, paramStr:}, responseListenerOrListeners)`
    * `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

### DOM 태그 구현

* `IFRAME` HTML의 iframe 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/IFRAME.js)
    * `IFRAME({name:})`
    * `IFRAME({src:})`
    * `IFRAME({style:})`
    * `IFRAME({c:})`
    * `IFRAME({on:})`

* `CANVAS` HTML의 canvas 태그와 대응되는 클래스입니다. `CANVAS`에 대해 더 알고싶다면 [CANVAS에 그림 그리기](CANVAS.md) 문서를 참고해주시기 바랍니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/CANVAS.js)
    * `CANVAS()`
    * `CANVAS({width:})`
    * `CANVAS({height:})`
    * `CANVAS({style:})`
    * `CANVAS({c:})`
    * `CANVAS({on:})`

* `CLEAR_BOTH()` 기본 스타일이 `clear : both`로 지정되어 있는 `DIV`를 생성합니다. [예제보기](../EXAMPLES/BROWSER/DOM/CLEAR_BOTH.js)

    ```javascript
    DIV({
        c : [
        // float : left
        DIV({
            style : {
                flt : 'left'
            }
        }),
        
        // float : right
        DIV({
            style : {
                flt : 'right'
            }
        }),
        
        // clear : both
        CLEAR_BOTH()]
    }).appendTo(BODY);
    ```
    
* `ANIMATE` 특정 NODE에 애니메이션을 추가합니다. [예제보기](../EXAMPLES/BROWSER/DOM/ANIMATION/ANIMATE.js)
    * `ANIMATE({node:, keyframes:})`
    * `ANIMATE({node:, keyframes:, duration:})`
    * `ANIMATE({node:, keyframes:, timingFunction:})`
    * `ANIMATE({node:, keyframes:, delay:})`
    * `ANIMATE({node:, keyframes:, iterationCount:})`
    * `ANIMATE({node:, keyframes:, direction:})`
    * `ANIMATE({node:, keyframes:, playState:})`
    * `ANIMATE({node:, keyframes:}, callback)`
    
    ```javascript
    ANIMATE({
		node : dom,
		keyframes : KEYFRAMES({
			from : {
				transform : 'rotate(0deg)'
			},
			to : {
				transform : 'rotate(360deg)'
			}
		}),
		duration : 3,
		timingFunction : 'linear'
	}, function() {
    	console.log('done!');
	})
    ```

* `KEYFRAMES(keyframes)` 애니메이션의 키프레임을 정의합니다. [예제보기](../EXAMPLES/BROWSER/DOM/ANIMATION/KEYFRAMES.js)

    ```javascript
    var
    // keyframes
    keyframes = KEYFRAMES({
		from : {
			marginLeft : 0,
			marginTop : 0
		},
		'50%' : {
			marginLeft : 100,
			marginTop : 100
		},
		to : {
			marginLeft : 0,
			marginTop : 0
		}
	});
    
    // bounce bounce!
	ANIMATE({
		node : dom,
		keyframes : keyframes,
		duration : 3
	});
    ```
    
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
