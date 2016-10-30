# JavaScript 만으로 웹 페이지 만들기

이 문서에서는 UJS를 이용하여 HTML과 CSS를 사용하지 않고, JavaScript 만으로 웹 페이지를 만드는 방법을 살펴볼 것입니다.

*※ 독자가 HTML과 CSS의 기본적인 내용을 알고 있다고 가정하고 설명합니다.*

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