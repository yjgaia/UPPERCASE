# Apache Cordova와 Crosswalk를 이용한 하이브리드 앱 개발
※ 이 문서는 작성중인 문서입니다.

Apache Cordova와 Crosswalk를 사용하여 하이브리드 앱을 만드는 방법입니다.

## Apache Cordova

1. Cordova 설치

###### Mac or Linux
```
sudo npm install -g cordova
```

###### Windows
```
npm install -g cordova
```

2. 프로젝트 생성

```
cordova create {폴더 이름} com.sample.Sample {프로젝트 이름}
```

ex)
```
cordova create Sample com.sample.Sample Sample
```

3. 컴파일 할 플랫폼 추가
```
cordova platform add ios
cordova platform add android
```

4. 코드 작성

5. 실행하기
```
cordova run
```

### Cordova에 플러그인 설치
```
cordova plugin add {{플러그인의 주소}}
```

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
crosswalk-cordova-11.40.277.7-arm/bin/create Sample com.sample.Sample Sample
```

Windows
```
crosswalk-cordova-11.40.277.7-arm\bin\create Sample com.sample.Sample Sample
```

3. 코드 작성

4. 실행하기
```
cd Sample
./cordova/run
```

### Crosswalk에 플러그인 설치
```
plugman install --platform android --project . --plugin {{플러그인의 주소}}
```

## BROWSER-PACK

