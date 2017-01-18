# UPPERCASE-BOOT
UPPERCASE-BOOT는 UPPERCASE의 모든 모듈을 불러들이고, 프로젝트를 실행하기 위해 필요한 모듈입니다. 구동을 위해 [UPPERCASE-MODEL](UPPERCASE-MODEL.md)이 필요합니다.
* [API 문서](../../API/UPPERCASE-API/NODE/README.md)

## 목차
* [사용방법](#사용방법)
* [`CONFIG`](#config)
* [`NODE_CONFIG`](#node_config)
* [`Box.R(path)`](#boxrpath)
* [`Box.RF(path)`](#boxrfpath)
* [`TIME(date)`](#timedate)
* [`SERVER_TIME(date)`](#server_timedate)

## 사용방법
[UPPERCASE를 설치](../README.md#설치하기)하였다면, 다음과 같이 프로젝트를 실행할 수 있습니다.

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

사실 UPPERCASE-BOOT는 UPPERCASE 그 자체이므로, [튜토리얼 문서](../TUTORIAL.md)를 참고하시어 프로젝트 개발을 진행하면 됩니다.

## `CONFIG`

## `NODE_CONFIG`

## `Box.R(path)`

웹 브라우저 환경에서만 사용 가능합니다.

## `Box.RF(path)`

웹 브라우저 환경에서만 사용 가능합니다.

## `TIME(date)`

웹 브라우저 환경에서만 사용 가능합니다.

## `SERVER_TIME(date)`

웹 브라우저 환경에서만 사용 가능합니다.
