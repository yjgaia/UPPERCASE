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

사실상 UPPERCASE-BOOT는 UPPERCASE 그 자체이므로, [튜토리얼 문서](../TUTORIAL.md)를 참고하시어 프로젝트 개발을 진행하면 됩니다.

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
