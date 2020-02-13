# ubm
UPPERCASE BOX를 관리하는 모듈입니다.

## ubm 설치
```
npm install -g ubm
```

## BOX 설치 및 업데이트
현재 폴더의 `DEPENDENCY` 파일에 수록되어 있는 모든 BOX들을 설치하거나 업데이트합니다.
```
ubm install
```

## BOX 패킹
현재 개발중인 BOX를 패킹하여 압축합니다.
```
ubm pack UUI
```

## API 문서 생성
BOX의 API 문서를 생성합니다.
```
ubm api UUI
```

## BOX 출시
현재 [BOX를 저장소](http://box.uppercase.io)에 출시합니다. 출시하기 전에 패킹을 수행하여야 합니다.
```
ubm publish Hanul/UUI
비밀번호: 
```

## 프로젝트 폴더 초기화
[프로젝트 구조](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/CREATE_PROJECT.md)에 따라 프로젝트 폴더를 초기화합니다.
```
ubm init UUI
```

## 하이브리드 앱을 위한 프로젝트 풀 패키징
[UPPERCASE를 기반으로 하이브리드 앱을 만들 때](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/HYBRID_APP.md) 애플리케이션에 프로젝트를 포함시키기 위하여 프로젝트 전체를 패키징 합니다.
```
ubm fullpack {{프로젝트 실행을 위한 코드.js}} {{프로젝트를 저장할 경로}}
```
```
ubm fullpack Sample.js SampleApp/android/www
```

사운드 파일 중 OGG 파일만 추가하고자 할 때
```
ubm fullpack Sample.js SampleApp/android/www ogg
```

사운드 파일 중 MP3, WAV 파일만 추가하고자 할 때
```
ubm fullpack Sample.js SampleApp/android/www mp3
```

`REQUEST` 관련 함수로 로컬 파일을 읽어들이고자 할 때
```
ubm fullpack Sample.js SampleApp/android/www ogg text.csv
```

## Web Extension을 위한 프로젝트 풀 패키징
```
ubm wefullpack Sample.js WebExtension
```

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)