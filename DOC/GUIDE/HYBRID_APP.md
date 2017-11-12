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
