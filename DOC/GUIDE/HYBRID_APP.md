작성중

# 하이브리드 앱 만들기

[Hybrid App 프로젝트](https://github.com/Hanul/HybridApp)를 기반으로 하이브리드 앱을 만들 수 있습니다.

* `BROWSER_CONFIG.host` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 호스트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.
* `BROWSER_CONFIG.port` 이 설정의 기본값은 현재 웹 브라우저에서 접속한 포트와 같습니다. 그러나 하이브리드 앱 등을 만들 경우 변경될 수 있습니다.

## 앱에 모든 리소스를 내장하는 경우
[`ubm`의 `fullpack` 기능](https://github.com/Hanul/ubm#%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C-%EC%95%B1%EC%9D%84-%EC%9C%84%ED%95%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%92%80-%ED%8C%A8%ED%82%A4%EC%A7%95)을 사용하여 모든 리소스를 패키징 할 수 있습니다.

## 웹 페이지를 불러와 앱에 표시하는 경우
