# JavaScript 만으로 웹 페이지 만들기

이 문서에서는 UJS를 이용하여 HTML과 CSS를 사용하지 않고, JavaScript 만으로 웹 페이지를 만드는 방법을 살펴볼 것입니다.

*※ 독자가 HTML과 CSS의 기본적인 내용을 알고 있다고 가정하고 설명합니다.*

HTML 코드와 CSS 코드, JS 코드가 분리되어 있던 기존 웹 애플리케이션 개발 방식에서는, DOM을 제어하기 위한 코드를 만들기가 굉장히 불편했습니다. JavaScript에서 DOM을 select 하여 일일히 조정하는 방식을 사용하였기 때문입니다. DOM을 select 하기 위하여, `id` 나 `class` 속성을 반드시 지정해 주어야 하였습니다.

```html
<!-- 기존에 DOM을 처리하던 방식 -->
<html>
    <head>
        <style>
            #hello {
                color : red;
            }
        </style>
    </head>
    <body>
        <p id="hello">안녕하세요.</p>
        <script>
        
            var
            // hello
            hello = document.getElementById('hello');
            
            hello.style.color = 'blue';
        
        </script>
    </body>
</html>
```

이는 HTML이 원래 문서 작성을 목적으로 만들어졌기 때문입니다. UJS에서는 이런 방식이 *웹 애플리케이션*을 만드는데는 적합하지 않다고 생각하였습니다. 따라서 JavaScript에서 DOM을 생성하는 방식을 떠올리게 되었습니다. 그러면, DOM을 select 하는 과정이 없어지기 때문에 좀 더 쉽게 DOM을 조정할 수 있습니다.

```html
<!-- JavaScript에서 DOM을 생성하는 방식 -->
<html>
    <body>
        <script>
        
            var
            // hello
            hello = document.createElement('p');
            hello.style.color = 'red';
            hello.appendChild(document.createTextNode('안녕하세요.'));
            document.body.appendChild(hello);
            
            hello.style.color = 'blue';
        
        </script>
    </body>
</html>
```

그런데 이 방법은, JavaScript 코드가 복잡하게 길어진다는 단점이 있습니다. 이를 간소화 하기 위해 UJS는 DOM을 추상화한 패키지를 제공합니다. 이를 사용하면, 아래와 같이 쉽게 표현할 수 있습니다.

```html
<!-- UJS의 DOM 패키지를 사용하는 방식 -->
<html>
    <body>
        <script src="UJS-BROWSER.js"></script>
        <script>
        
            var
            // hello
            hello = P({
                style : {
                    color : 'red'
                },
                c : '안녕하세요.'
            }).appendTo(BODY);
            
            hello.addStyle({
                color : 'blue'
            });
        
        </script>
    </body>
</html>
```

DOM 패키지에 대한 자세한 내용은 [UJS-BROWSER](UJS-BROWSER.md) 문서의 `DOM 태그 구현` 항목을 참고해 주시기 바랍니다.