# UJS-BROWSER
웹 브라우저 환경에서 사용할 수 있는 유틸리티 라이브러리 및 DOM(Document Object Model) 템플릿 엔진입니다.

## 설계 철학
`UJS-BROWSER`는 UJS의 설계자이자 개발자인 [Hanul](https://github.com/Hanul)의 주관적인 철학에 의해 작성되었습니다.
* HTML의 내용 중 그다지 필요하지 않다 싶은 기능은 과감히 빼버렸습니다. (예를들어 span 태그의 title 등) - 만약 필요한 기능인데도 지원하지 않는다고 생각하시면, [GitHub Issues](https://github.com/Hanul/UJS/issues)에 남겨주시면 감사하겠습니다.
* 브라우저 호환성을 대단히 중요하게 생각합니다. - 국제사회와는 거리가 먼 대한민국의 웹 브라우저 사용 현황에 큰 영향을 받았습니다.

* `UJS-BROWSER`는 기본적으로는 최신 웹 브라우저에서 돌아가도록 구현되어 있습니다.
구버젼 웹 브라우저들을 지원하기 위해서는 `UJS-BROWSER-FIX`를 함께 구동시키시기 바랍니다. 관련 내용은 [하단에 수록](#uppercasejs-browser-fix)되어 있습니다.

## INFO
브라우저의 정보들을 담고 있는 OBJECT입니다.
[예제보기](../EXAMPLES/BROWSER/INFO.js)

* `getLang` 현재 웹 애플리케이션의 언어 설정을 가져옵니다. 처음에는 브라우저의 언어 설정으로 설정됩니다.
* `changeLang` 현재 웹 애플리케이션의 언어 설정을 변경합니다.
* `checkIsHDDisplay` HD(High-definition) 화면인지 확인합니다.
* `checkIsTouchMode` 터치 모드인지 확인합니다. 터치로만 조작이 가능한 기기에서는 항상 `true`를 반환하고, 마우스로만 조작이 가능한 기기에서는 항상 `false`를 반환합니다. 둘 다 가능한 기기에서는 터치를 할 경우나 마우스를 조작할 경우 변경됩니다.
* `getBrowserInfo` 웹 브라우저의 정보를 반환합니다.

```javascript
// 'ko'
INFO.getLang()

// ex) INFO.changeLang('ko')
INFO.changeLang(lang)

INFO.checkIsHDDisplay()

INFO.checkIsTouchMode()

// { name : 'Chrome', version : 41 }
INFO.getBrowserInfo()
```

## 윈도우 관련 기능
* `TITLE()`, `TITLE(title)` 윈도우의 제목을 가져오거나, 변경합니다. [예제보기](../EXAMPLES/BROWSER/WINDOW.js)
* `WIN_WIDTH()` 윈도우의 가로 길이를 픽셀 단위로 반환합니다. [예제보기](../EXAMPLES/BROWSER/WIN_WIDTH.js)
* `WIN_HEIGHT()` 윈도우의 세로 길이를 픽셀 단위로 반환합니다. [예제보기](../EXAMPLES/BROWSER/WIN_HEIGHT.js)
* `SCROLL_LEFT()` 가로 스크롤 위치를 픽셀 단위로 반환합니다. [예제보기](../EXAMPLES/BROWSER/SCROLL_LEFT.js)
* `SCROLL_TOP()` 세로 스크롤 위치를 픽셀 단위로 반환합니다. [예제보기](../EXAMPLES/BROWSER/SCROLL_TOP.js)

## 그래픽 관련 기능
* `CHECK_IS_BLANK_PIXEL({img:, left:, top:}, callback)` `CHECK_IS_BLANK_PIXEL({img:, right:, bottom:}, callback)` 특정 픽셀이 투명 픽셀인지 확인합니다. [예제보기](../EXAMPLES/BROWSER/GRAPHIC/CHECK_IS_BLANK_PIXEL.js)
* `EXPORT_IMG_DATA(img, callback)` 이미지의 픽셀 데이터를 추출합니다. [예제보기](../EXAMPLES/BROWSER/GRAPHIC/EXPORT_IMG_DATA.js)
* `EXPORT_IMG_TYPE(img, callback)` 이미지의 형식을 추출합니다. [예제보기](../EXAMPLES/BROWSER/GRAPHIC/EXPORT_IMG_TYPE.js)

    ```javascript
    var
    // img
    img = IMG({
        src : 'image.png'
    });
    
    EXPORT_IMG_TYPE(img, function(imgType) {
        // png
        console.log(imgType);
    })
    ```

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

## 기타 기능

* `STORE(storeName)` `Box.STORE(storeName)` 저장소를 생성하여 데이터를 저장할 수 있는 클래스 입니다. 이를 이용해서 브라우저가 종료되더라도 특정 데이터를 저장할 수 있습니다. 저장할 때 `isToSession` 파라미터를 `true`로 지정하면 브라우저가 종료 될 때 데이터를 자동으로 지울수도 있습니다. [예제보기](../EXAMPLES/BROWSER/STORE.js)

    ```javascript
    var
    // store
    store = STORE('testStore');

    store.save({ name:, value:, isToSession: })

    store.get(name)

    store.remove(name)
    ```

* `COOKIE_STORE(storeName)` `COOKIE_STORE({ storeName:, domain: })` `Box.COOKIE_STORE(storeName)` 쿠키에 데이터를 저장할 수 있는 클래스 입니다. 저장할 때 `isToSession` 파라미터를 `true`로 지정하면 브라우저가 종료 될 때 데이터를 자동으로 지울수도 있습니다. `domain`을 지정할 수 있습니다. [예제보기](../EXAMPLES/BROWSER/STORE.js)

    ```javascript
    var
    // store
    store = COOKIE_STORE('testStore');

    store.save({ name:, value:, isToSession: })

    store.get(name)

    store.remove(name)
    ```

* `MSG({ko:, en:, ...})` 국제화 문자열 처리 기능입니다. 기본적으로 브라우저의 언어 설정을 가져와 처리합니다. [예제보기](../EXAMPLES/BROWSER/I18N/MSG.js)

    ```javascript
    // 만약 브라우저 언어 설정이 한국어로 되어 있다면 '집'
    MSG({
        ko : '집',
        en : 'Home'
    })
    ```

* `META_DESCRIPTION(description)` HTML 페이지에 description meta 태그를 설정합니다. [예제보기](../EXAMPLES/BROWSER/META_DESCRIPTION.js)

    ```javascript
	META_DESCRIPTION('This is description!');

	ok(META_DESCRIPTION() === 'This is description!');
    ```

## DOM(Document Object Model) 템플릿 엔진
UJS의 DOM 템플릿 엔진은 순수 JavaScript만을 기반으로 합니다. 따라서 HTML이나 CSS 코드를 작성하지 않습니다. 모든 구현은 JavaScript로 이루어집니다. 그러나 기본적인 Font-end 개발 방법을 알고 있어야 합니다.

아래는 DOM 태그들로 폼 화면을 구성하는 예제입니다.
```javascript
DIV({
	style : {
		backgroundColor : 'red',
		padding : 20
	},
	c : FORM({
    	c : [DIV({
    		c : [H5({
    			c : 'Name'
    		}), input = INPUT({
    			name : 'name'
    		})]
    	}), DIV({
    		style : {
    			marginTop : 10
    		},
    		c : [H5({
    			c : 'Gender'
    		}), SELECT({
    			name : 'gender',
    			c : [OPTION({
    				value : 'male',
    				c : 'Male'
    			}), OPTION({
    				value : 'female',
    				c : 'Female'
    			})]
    		})]
    	}), DIV({
    		style : {
    			marginTop : 10
    		},
    		c : [H5({
    			c : 'Age'
    		}), INPUT({
    			name : 'age'
    		})]
    	}), DIV({
    		style : {
    			marginTop : 10
    		},
    		c : [H5({
    			c : 'Profile'
    		}), TEXTAREA({
    			name : 'profile'
    		})]
    	}), INPUT({
    	    type : 'submit',
            value : 'Join'
    	})]
    })
}).appendTo(BODY);
```

다음과 같은 기능들이 포함되어 있습니다.

* NODE 인터페이스
* DOM 태그 구현
* 스타일 및 애니메이션
* 이벤트

### NODE 인터페이스
NODE 인터페이스를 사용하여 웹 페이지를 구성하는 NODE를 만들어낼 수 있습니다. 아래 DOM 태그 구현에서도 사용되지만, 개발자가 직접 NODE의 종류를 추가할 때도 이를 상속하여 사용할 수 있습니다. [예제보기](../EXAMPLES/BROWSER/DOM/NODE.js)
#### 제공하는 메소드
- `inner.setWrapperDom(dom)` 감싸는 DOM을 지정합니다.
- `inner.setContentDom(dom)` 내부 DOM을 지정합니다.
- `inner.setDom(dom)` 감싸는 DOM과 내부 DOM이 동일한 경우 둘을 같은 DOM으로 지정합니다.
- `getWrapperDom` 감싸는 DOM을 반환합니다.
- `getContentDom` 내부 DOM을 반환합니다.
- `getWrapperEl` 감싸는 DOM의 HTML element를 반환합니다.
- `getContentEl` 내부 DOM의 HTML element를 반환합니다.
- `append(node)` 자식 노드를 맨 뒤에 붙힙니다.
- `appendTo(node)` 특정 노드의 맨 뒤에 자식 노드로 붙습니다.
- `prepend(node)` 자식 노드를 맨 앞에 붙힙니다.
- `prependTo(node)` 특정 노드의 맨 앞에 자식 노드로 붙습니다.
- `after(node)` 특정 노드를 바로 뒤에 붙힙니다.
- `insertAfter(node)` 특정 노드의 바로 뒤에 붙습니다.
- `before(node)` 특정 노드를 바로 앞에 붙힙니다.
- `insertBefore(node)` 특정 노드의 바로 앞에 붙습니다.
- `remove()` 노드를 지웁니다.
- `empty()` 모든 자식 노드들을 지웁니다.
- `setParent(node)` 부모 노드를 지정합니다.
- `getParent()` 부모 노드를 반환합니다.
- `getChildren()` 모든 자식 노드들을 반환합니다.
- `on(eventName, eventHandler)` 이벤트를 지정합니다.
- `off(eventName)` `off(eventName, eventHandler)` 이벤트를 제거합니다.
- `addStyle(style)` 스타일을 지정합니다.
- `getStyle()` 노드의 스타일 정보를 반환합니다.
- `getWidth()` 가로 길이를 반환합니다.
- `getInnerWidth()` 여백을 제외한 가로 길이를 반환합니다.
- `getHeight()` 세로 길이를 반환합니다.
- `getInnerHeight()` 여백을 제외한 세로 길이를 반환합니다.
- `getLeft()` 화면에서 왼쪽으로부터 얼마나 떨어져 있는지 반환합니다.
- `getTop()` 화면에서 위쪽으로부터 얼마나 떨어져 있는지 반환합니다.
- `hide()` 노드를 숨깁니다.
- `show()` 노드를 숨기지 않습니다.
- `checkIsShowing()` 노드가 보여지고 있는지 확인합니다.
- `setData(data)` 노드에 데이터를 저장합니다.
- `getData()` 저장된 데이터를 반환합니다.
- `scrollTo({left:, top:})` `overflow`가 `scroll`인 노드의 스크롤 위치를 지정합니다.
- `getScrollLeft()` 노드의 왼쪽으로부터의 스크롤 위치를 가져옵니다.
- `getScrollTop()` 노드의 위쪽으로부터의 스크롤 위치를 가져옵니다.
- `getScrollWidth()` 노드의 스크롤 너비를 가져옵니다.
- `getScrollHeight()` 노드의 스크롤 높이를 가져옵니다.

### DOM 태그 구현
* `DOM` 새로 DOM을 만들어내는 클래스입니다. 이하 여러가지 태그와 대응되는 클래스들은 이를 상속합니다. 아래 만들어져 있는 태그들만으로도 보통의 웹 개발시에는 문제가 없다고 판단되나, 필요에 의해 특정 태그를 추가로 더 만들고자 하는 경우에는 이 클래스를 상속하여 만들 수 있습니다. [예제보기](../EXAMPLES/BROWSER/DOM/DOM.js)
    * `DOM({tag:})`
    * `DOM({tag:, style:})`
    * `DOM({tag:, c:})`
    * `DOM({tag:, on:})`
    * `DOM({el:})`

* `BODY` HTML의 body 태그와 대응되는 객체입니다. `BODY`는 그 자체로 객체이므로, 새로 생성할 수 없습니다.

    ```javascript
    // BODY는 새로 생성할 수 없이 그 자체로 객체이다.
    DIV({
        c : 'Hello!'
    }).appendTo(BODY);
    ```

* `DIV` HTML의 div 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/DIV.js)
    * `DIV({style:})`
    * `DIV({c:})`
    * `DIV({on:})`

* `SPAN` HTML의 span 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/SPAN.js)
    * `SPAN({style:})`
    * `SPAN({c:})`
    * `SPAN({on:})`

* `H1` HTML의 h1 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/H1.js)
    * `H1({style:})`
    * `H1({c:})`
    * `H1({on:})`

* `H2` HTML의 h2 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/H1.js)
    * `H2({style:})`
    * `H2({c:})`
    * `H2({on:})`

* `H3` HTML의 h3 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/H1.js)
    * `H3({style:})`
    * `H3({c:})`
    * `H3({on:})`

* `H4` HTML의 h4 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/H1.js)
    * `H4({style:})`
    * `H4({c:})`
    * `H4({on:})`

* `H5` HTML의 h5 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/H1.js)
    * `H5({style:})`
    * `H5({c:})`
    * `H5({on:})`

* `H6` HTML의 h6 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/H1.js)
    * `H6({style:})`
    * `H6({c:})`
    * `H6({on:})`

* `P` HTML의 p 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/P.js)
    * `P({style:})`
    * `P({c:})`
    * `P({on:})`

* `BR()` HTML의 BR 태그와 대응되는 클래스입니다.

* `UL` HTML의 ul 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/UL.js)
    * `UL({style:})`
    * `UL({c:})`
    * `UL({on:})`

* `LI` HTML의 li 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/UL.js)
    * `LI({style:})`
    * `LI({c:})`
    * `LI({on:})`

* `A` HTML의 a 태그와 대응되는 클래스입니다. [예제보기](../EXAMPLES/BROWSER/DOM/TAG/A.js)
    * `A({href:})`
    * `A({href:, target:})`
    * `A({style:})`
    * `A({c:})`
    * `A({on:})`

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

## UJS-BROWSER-FIX
구형 웹 브라우저들을 지원하기 위해, UJS는 `UJS-BROWSER-FIX`라는 패키지를 지원하고 있습니다. 이는 객체지향의 상속 기능을 활용하여 구버젼 브라우저에서는 잘 동작하지 않는 기능들을 재작성한 것입니다. *Internet Explorer 5.5*나, *Android 2.1 Browser* 등 현재는 거의 쓰이지 않는 브라우저들까지 지원하기 때문에, 개발자는 브라우저의 하위 호환성을 신경쓰지 않아도 됩니다.

### 설치하기
[UJS 설치하기](INSTALL.md) 문서에도 잘 나와 있듯이, UJS-BROWSER-FIX를 설치하려면 UJS-BROWSER-FIX 폴더를 지정하고, `FIX.js`를 불러와야 합니다.

```html
<!-- UJS-BROWSER.js를 불러옵니다. -->
<script src="/UJS-BROWSER.js"></script>
<!-- 구버젼 브라우저에 대한 지원과, 각종 브라우저들이 갖고있는 버그를 고쳐주는 BROWSER-FIX를 불러옵니다. -->
<script>
	// UJS-BROWSER-FIX 폴더 지정
    BROWSER_CONFIG.fixScriptsFolderPath = '/UJS-BROWSER-FIX';
    // FIX.js를 불러옵니다.
    LOAD('/UJS-BROWSER-FIX/FIX.js');
</script>
```

### 구버젼 브라우저에서 작동하지 않는 기능들
아래 기능들은 구버젼 브라우저에서는 작동하지 않는 기능들입니다. 다만, 호환성을 중요시하는 UJS 특성상 오류를 발생시키지는 않습니다.

* SOUND
* VIDEO

### 기타 주의사항
* `EXPORT_IMG_DATA`는 IE8 이하 버젼에서는 메모리 부족으로 제대로 처리되지 않을 수 있습니다.
* IE10 미만의 브라우저에서는 AJAX 관련 기능을 사용할 때 CORS(Cross-Origin Resource Sharing)가 작동하지 않습니다.
* IE8에서는 href의 값을 바꾸면 DOM의 내용이 해당 href로 변경되어 버리는 버그가 존잰하므로, A 태그의 `setHref` 함수에서 문제가 발생할 수 있습니다.
* HTML5 Push State를 지원하지 않는 브라우저에서는 VIEW 관련 기능은 hashbang(#!) 방식으로 변경됩니다.

## HTML5 Canvas 지원
FlashCanvas를 이용해 구버젼 브라우저에서도 플래시를 통한 HTML5 Canvas가 지원됩니다.
그러나 제공하는 기능에 제약이 있으므로, 제대로 된 Canvas 기능을 사용하시려면 `CANVAS`의 `getEl` 메소드로 element를 가져 온 뒤에 처리하시기 바랍니다.
그러나 이럴 경우, UJS가 제공하는 하위 호환성은 무시됩니다.

```javascript
var
// canvas
canvas = CANVAS(),

// canvas el
canvasEl = canvas.getEl();
```

다음 문서: [UJS-NODE](UJS-NODE.md)
