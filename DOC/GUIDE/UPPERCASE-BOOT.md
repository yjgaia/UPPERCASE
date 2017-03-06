# UPPERCASE-BOOT
UPPERCASE-BOOT는 UPPERCASE의 모든 모듈을 불러들이고, 프로젝트를 실행하기 위해 필요한 모듈입니다.
* [API 문서](../../API/UPPERCASE-API/NODE/README.md)

## 목차
* [사용방법](#사용방법)
* [`CONFIG`](#config)
* [`NODE_CONFIG`](#node_config)
* [`Box.R(path)`](#boxrpath)
* [`Box.RF(path)`](#boxrfpath)
* [`TIME(date)`](#timedate)
* [`SERVER_TIME(date)`](#server_timedate)
* UPPERCASE의 기본 스타일
* index.html 수정하기

## 사용방법
[UPPERCASE를 설치](../INSTALL.md)하였다면, 다음과 같이 프로젝트를 실행할 수 있습니다.

```javascript
require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		isDevMode : true,
		defaultBoxName : 'Hello',
		webServerPort : 8888
	}
});
```

UPPERCASE-BOOT는 UPPERCASE의 모든 모듈을 불러들이고, 프로젝트를 실행시키기 때문에, 이제 [튜토리얼 문서](../TUTORIAL.md)를 참고하시어 프로젝트 개발을 진행하면 됩니다.

## `CONFIG`

* `maxThumbWidth` 이미지 업로드 시 만들어지는 섬네일의 최대 가로 길이를 설정합니다.
* `maxThumbHeight` 이미지 업로드 시 만들어지는 섬네일의 최대 세로 길이를 설정합니다.

## `NODE_CONFIG`

* `maxUploadFileMB` 업로드 가능한 최대 파일 크기를 MB 단위로 설정합니다. 기본값은 `10` 입니다.

## `Box.R(path)`

웹 브라우저 환경에서만 사용 가능합니다.

## `Box.RF(path)`
업로드한 파일의 경로를 가져옵니다.

웹 브라우저 환경에서만 사용 가능합니다.

* UPPERCASE 기반 프로젝트에서 업로드 한 파일들은 `__RF` 폴더에 저장됩니다.
* 이미지의 경우 `__RF/THUMB` 파일에 섬네일이 저장됩니다.

## `TIME(date)`

웹 브라우저 환경에서만 사용 가능합니다.

## `SERVER_TIME(date)`

웹 브라우저 환경에서만 사용 가능합니다.

## UPPERCASE의 기본 스타일
UPPERCASE는 웹 브라우저에 상관 없이 같은 모양이 출력되게 하는 기본 스타일을 제공합니다.

스타일의 자세한 내용은 [BASE_STYLE.css](../../SRC/IO/R/BASE_STYLE.css) 파일을 참고하시기 바랍니다.

## index.html 수정하기
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










# UPPERCASE
이 문서는 UPPERCASE의 API 관련 내용을 담고 있습니다. UPPERCASE 기반 프로젝트를 개발하기 위해서는 다음 문서들을 참고하시기 바랍니다.

* [UPPERCASE 설치하기](INSTALL.md)
* [프로젝트 생성](CREATE_PROJECT.md)
* [모델 생성](CREATE_MODEL.md)
* [간단한 블로그 만들기](MAKE_BLOG.md)
* [블로그에 인증 추가하기](ADD_AUTH_TO_BLOG.md)
* [UPPERCASE가 제공하는 기능들 살펴보기](OVERVIEW.md)
* [Configuration](CONFIG.md)
* [UPPERCASE 업데이트](UPDATE.md)

## 설정
UPPERCASE의 설정은 [Configuration](CONFIG.md) 문서를 참고해 주시기 바랍니다.

## BROWSER API
* `CONNECT_TO_IO_SERVER((on, off, send) => {...})` `CONNECT_TO_IO_SERVER({error:, success:})` UPPERCASE 서버에 접속합니다.

### 리소스 경로 관련
클라이언트에서 사용 가능한 리소스 경로 관련 API입니다.
* `SampleBox.R(path)` `SampleBox.R(path, (content) => {...})` 리소스의 실제 경로를 반환하거나, 리소스의 내용을 가져옵니다. [예제보기](../EXAMPLES/IO/CLIENT/R.js)
* `SampleBox.RF(path)` 불변 리소스의 실제 경로를 반환합니다. [예제보기](../EXAMPLES/IO/CLIENT/RF.js)

### 서버 시간 관련
클라이언트와 서버 시간을 동기화하기 위한 API 입니다.
* `TIME(date)` 브라우저와 서버 시간의 차이를 계산하여, 데이터베이스에 저장되어 있던 시간을 브라우저의 국가 설정에 맞는 시간대로 변경합니다. [예제보기](../EXAMPLES/IO/CLIENT/TIME.js)
* `SERVER_TIME(date)` `TIME`과 반대 역할을 합니다. 변경된 시간을 서버의 시간대로 변경합니다. [예제보기](../EXAMPLES/IO/CLIENT/SERVER_TIME.js)
