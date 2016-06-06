# index.html을 따로 만들고 싶다면
기본적으로 UPPERCASE가 index.html을 생성하기에 일반적으로 이 내용이 필요하지는 않을 것입니다. 그러나 특정한 사유로 인해 index.html을 따로 만들고 싶을 수 있습니다. 그럴 때는 `BROWSER`, `COMMON`, `NODE` 등의 폴더가 있는 프로젝트 폴더에 index.html을 만들면 자동으로 이를 인식하여 사용하게 됩니다. UPPERCASE와 연동하기 위한 기본적인 index.html의 틀은 다음과 같습니다. 이를 수정해서 사용하시기 바랍니다.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<meta name="fragment" content="!">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
		<link href="/favicon.ico" rel="shortcut icon">
		<title>샘플 페이지</title>
		<link rel="stylesheet" type="text/css" href="/__CSS">
	</head>
	<body>
		<script src="/__SCRIPT"></script>
	</body>
</html>
```