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


## Crosswalk

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