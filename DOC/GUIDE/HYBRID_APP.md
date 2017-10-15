작성중

# 하이브리드 앱 만들기

* 데스크톱 애플리케이션
* 모바일 애플리케이션

* `BROWSER_CONFIG.host` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 호스트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.
* `BROWSER_CONFIG.port` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 포트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.

## Electron을 이용한 데스크톱 애플리케이션 개발
https://electron.atom.io/

electron 패키지를 설치합니다.
```
npm install electron
```

electron-packager를 설치합니다.
```
npm install -g electron-packager
```

패키징을 합니다.
```
electron-packager . SampleApp --platform win32 --arch x64 --out dist/ --electron-version=1.7.6
```

이후 node_modules 폴더를 dist/SampleApp-win32-x64/resources/app 폴더에 복사해줍니다.

## NW.js를 이용한 데스크톱 애플리케이션 개발
https://nwjs.io/

## Apache Cordova를 이용한 모바일 애플리케이션 개발

Apache Cordova와 Crosswalk를 사용하여 하이브리드 앱을 만드는 방법입니다.

## Apache Cordova

1. Cordova 설치
```
npm install -g cordova
```

2. 프로젝트 생성
```
cordova create {{폴더 이름}} com.sample.Sample {{프로젝트 이름}}
```

3. 폴더로 이동
```
cd {{폴더 이름}}
```

4. 컴파일 할 플랫폼 추가
```
cordova platform add ios
cordova platform add android
```

5. 프로젝트 풀 패키지 추가
[`ubm`](https://www.npmjs.com/package/ubm)을 이용해 [프로젝트를 풀 패키징](ubm#하이브리드-앱을-위한-프로젝트-풀-패키징)하여 추가합니다.
```
ubm fullpack {{프로젝트 실행을 위한 코드.js}} {{프로젝트를 저장할 경로}}
```

6. `index.html` 파일 생성
[UPPERCASE의 `index.html` 파일](UPPERCASE-BOOT.md#indexhtml-수정하기)과 비슷한 `index.html` 파일을 생성합니다. 특이사항은 리소스의 경로를 상대 경로로 지정해야 한다는 것과, `cordova.js` 파일을 포함해야 하며, `deviceready` 이벤트에 Cordova 플러그인 실행 코드를 작성해야 한다는 것입니다.
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
		<title>샘플 페이지</title>
		<link rel="stylesheet" type="text/css" href="__CSS" />
	</head>
	<body>
        <script src="cordova.js"></script>
		<script src="__SCRIPT"></script>
		<script>
			EVENT('deviceready', () => {
				// Cordova 플러그인 실행 코드 작성
			});
		</script>
	</body>
</html>
```

7. 실행하기
```
cordova run ios
```
```
cordova run android
```

### 플러그인 설치
```
cordova plugin add {{플러그인의 주소}}
```

### 배포하기


## Crosswalk
### Crosswalk을 사용해야 하는 이유
* Chromium 기반이 아닌 안드로이드 4.x 이전 버젼에서의 웹뷰는 웹 표준을 제대로 지원하지 않고, 온갖 버그가 산재합니다.
* 안드로이드 4.x 버젼까지의 웹뷰는 하드웨어 가속을 사용하지 않아 매우 느립니다.
* 안드로이드 4.4의 웹뷰에서 파일 업로드 시 input을 눌러도 작동을 하지 않는 버그가 있습니다.

1. Crosswalk 설치
https://crosswalk-project.org 에 방문하여 `Cordova Android (ARM)`를 다운로드 하여 적당한 폴더에 풀어줍니다.

2. 프로젝트 생성

Mac or Linux
```
crosswalk-cordova-15.44.384.12-arm/bin/create {{폴더 이름}} com.sample.Sample {{프로젝트 이름}}
```

Windows
```
crosswalk-cordova-15.44.384.12-arm\bin\create {{폴더 이름}} com.sample.Sample {{프로젝트 이름}}
```

3. 코드 작성

4. 실행하기
```
cd Sample
./cordova/run
```

### 플러그인 설치
```
plugman install --platform android --project . --plugin {{플러그인의 주소}}
```

### 플러그인 삭제
```
plugman uninstall --platform android --project . --plugin {{플러그인의 패키지 명}}
```

### 배포하기
우선은 배포를 위한 키 저장소를 만듭니다. 이 저장소는 여러 앱에서 사용될 수 있습니다.
```
keytool -genkey -v -keystore {{키 저장소 파일명}} -alias {{alias 이름}} -keyalg {{암호화 방식}} -keysize {{key 크기}} -validity {{유효기간 (일)}}
```

예시)
```
keytool -genkey -v -keystore sample-keystore.keystore -alias sample-01 -keyalg RSA -keysize 2048 -validity 18250
```

그리고 아래 명령어들을 순서대로 입력하여 최종 배포판 apk 파일을 만듭니다. 그 전에, `jdk`에서 제공하는 `jarsigner`와 `Android build-tools`가 제공하는 `zipalign`를 사용할 수 있도록 `PATH`가 등록되어 있는지 확인합니다.
```
cordova\build --release
mv bin\{{프로젝트 이름}}-release-unsigned.apk {{프로젝트 이름}}-release-unsigned.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore {{keystore 경로}} {{프로젝트 이름}}-release-unsigned.apk {{alias 이름}}
zipalign -v 4 {{프로젝트 이름}}-release-unsigned.apk {{프로젝트 이름}}.apk
```

## BROWSER-PACK

## 웹앱 만들기
단순히 웹 사이트를 보여주는 애플리케이션을 만드려면 `config.xml`의 `content` 태그를 다음과 같이 변경합니다.
```xml
<content src="http://sample.com" />
```

