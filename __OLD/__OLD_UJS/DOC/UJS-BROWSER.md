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

## DOM(Document Object Model) 템플릿 엔진

다음과 같은 기능들이 포함되어 있습니다.

* NODE 인터페이스
* DOM 태그 구현
* 스타일 및 애니메이션
* 이벤트

### DOM 태그 구현

* `UL` HTML의 ul 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/UL.js)
    * `UL({style:})`
    * `UL({c:})`
    * `UL({on:})`

* `LI` HTML의 li 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/UL.js)
    * `LI({style:})`
    * `LI({c:})`
    * `LI({on:})`

* `IMG` HTML의 img 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/IMG.js)
    * `IMG({src:})`
    * `IMG({style:})`
    * `IMG({c:})`
    * `IMG({on:})`

* `TABLE` HTML의 table 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
    * `TABLE({style:})`
    * `TABLE({c:})`
    * `TABLE({on:})`

* `TR` HTML의 tr 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
    * `TR({style:})`
    * `TR({c:})`
    * `TR({on:})`

* `TH` HTML의 th 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
    * `TH({style:})`
    * `TH({c:})`
    * `TH({on:})`

* `TD` HTML의 td 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/TABLE.js)
    * `TD({style:})`
    * `TD({c:})`
    * `TD({on:})`

* `FORM` HTML의 form 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/FORM.js)
    * `FORM({action:})`
    * `FORM({target:})`
    * `FORM({method:})`
    * `FORM({enctype:})`
    * `FORM({style:})`
    * `FORM({c:})`
    * `FORM({on:})`

* `INPUT` HTML의 input 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/INPUT.js)
    * `INPUT({name:})`
    * `INPUT({type:})`
    * `INPUT({placeholder:})`
    * `INPUT({value:})`
    * `INPUT({isMultiple:})`
    * `INPUT({style:})`
    * `INPUT({on:})`

* `TEXTAREA` HTML의 textarea 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/FORM.js)
    * `TEXTAREA({name:})`
    * `TEXTAREA({placeholder:})`
    * `TEXTAREA({value:})`
    * `TEXTAREA({style:})`
    * `TEXTAREA({c:})`
    * `TEXTAREA({on:})`

* `SELECT` HTML의 select 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/FORM.js)
    * `SELECT({name:})`
    * `SELECT({value:})`
    * `SELECT({style:})`
    * `SELECT({c:})`
    * `SELECT({on:})`

* `OPTGROUP` HTML의 optgroup 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/FORM.js)
    * `OPTGROUP({label:})`

* `OPTION` HTML의 option 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/FORM.js)
    * `OPTION({value:})`
    * `OPTION({c:})`

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

참고로 DOM 태그 구현에는 **`id`와 `class`를 지정할 수 없고, 그럴 필요도 없습니다.** 스타일을 지정하기 위해서는 `style` 파라미터를 넘기거나 `ADD_STYLE`로 지정할 수 있고, DOM을 가져오기 위해서 `id`로 가져올 필요 없이 DOM 자체를 변수에 지정하면 됩니다.

```javascript
// 아래와 같이 DOM 자체를 변수에 지정하면 됩니다.
var
// div
div = DIV({
	stlye : {
		padding : 10
	}
}).appendTo(BODY);

ADD_STYLE({
    node : div,
    style : {
        backgroundColor : '#000',
        color : '#fff'
    }
});
```

그러나 정말로 필요한 경우, 아래와 같이 HTML Element를 가져와 설정할 수 있습니다.

```javascript
var
// div
div = DIV().appendTo(BODY);

div.getEl().addAttribute('id', 'test');
div.getEl().addAttribute('class', 'sample');
```

### 스타일 및 애니메이션
* `ADD_STYLE({node:, style:})` NODE에 스타일을 적용합니다. NODE의 `style` 파라미터 처리에도 사용됩니다. 참고로, 픽셀값(px)에는 `px`를 붙히지 않고 그냥 숫자만 써도 적용됩니다. [예제보기](../EXAMPLES/BROWSER/DOM/STYLE/ADD_STYLE.js)

    ```javascript
    var
    // div
    div = DIV({
        style : {
            padding : 10
        },
        c : 'I LOVE BLACK!'
    }).appendTo(BODY);
    
    ADD_STYLE({
        node : div,
        style : {
            backgroundColor : '#000',
            color : '#fff'
        }
    })
    ```

* `RGBA([r, g, b, a])` `r`, `g`, `b`, `a`를 입력받아 RGBA 문자열을 만듭니다. [예제보기](../EXAMPLES/BROWSER/DOM/STYLE/RGBA.js)

    ```javascript
    ADD_STYLE({
        node : dom,
        style : {
            // rgba(255, 0, 0, 0.5)
            backgroundColor : RGBA([255, 0, 0, 0.5])
        }
    })
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

### 이벤트
* `EVENT(name, func)` `EVENT({node:, name:}, func)` 특정 NODE에 이벤트를 적용하는 클래스입니다. NODE의 `on` 파라미터 처리에도 사용됩니다. `remove`로 이벤트를 중지시킬 수 있습니다. [예제보기](../EXAMPLES/BROWSER/DOM/EVENT/EVENT.js)

    ```javascript
    var
    // div
    div = DIV({
        c : 'TOUCH ME!'
    }).appendTo(BODY),
    
    // event
    evt = EVENT({
        node : div,
        name : 'tap'
    }, function(e) {
    	e.getLeft();
    	e.getTop();
        ...
    });
    
    evt.remove()
    ```

* `EVENT_ONCE(name, func)` `EVENT_ONCE({node:, name:}, func)` 특정 NODE에 한번만 발생하는 이벤트를 적용하는 클래스입니다. 이벤트가 처음 한번 발생하면 더 이상 이벤트가 발생하지 않습니다. [예제보기](../EXAMPLES/BROWSER/DOM/EVENT/EVENT_ONCE.js)

    ```javascript
    var
    // div
    div = DIV({
        c : 'TOUCH ME!'
    }).appendTo(BODY),
    
    EVENT_ONCE({
        node : div,
        name : 'tap'
    }, function(e) {
    	e.getLeft();
    	e.getTop();
        ...
    })
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
