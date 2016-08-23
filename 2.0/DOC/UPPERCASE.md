# ![ScreenShot](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/LOGO.png)
UPPERCASE는 웹 어플리케이션 개발을 도와주는 JavaScript 기반 프레임워크입니다. 서버와 클라이언트를 부드럽게 연결는데 특화되어, 예를 들어 메신저나 SNS와 같이 실시간성이 중요한 애플리케이션 개발에 특히 유용합니다. 또한 단지 서버 프레임워크로만으로 사용해도 되고, 서버가 불필요한 웹 애플리케이션 개발을 할 때에도 유용하게 사용할 수 있습니다.

## 왜 이름이 UPPERCASE인가요?
UPPERCASE의 모든 기능들의 이름은 JavaScript의 키워드나 변수 이름, 다른 라이브러리들에서 사용하는 이름을 피하기 위해 대문자로 이루어져 있습니다. 비슷한 논리로, [jQuery](https://jquery.com/)는 `$`를, [Underscore](http://underscorejs.org/)는 `_`를 접두사로 사용하고 있습니다.

```javascript
// UPPERCASE
EACH([52, 97], function(value, index) {
    alert(index + ': ' + value);
});

// jQuery
$.each([52, 97], function(index, value) {
    alert(index + ': ' + value);
});

// Underscore
_.each([52, 97], function(value, index) {
    alert(index + ': ' + value);
});
```

## UPPERCASE를 사용하기 위해 필요한 사전 지식
* `JavaScript` UPPERCASE는 JavaScript 기반 프레임워크이므로, JavaScript를 필수로 알고 있어야 합니다.
* [Node.js](http://nodejs.org)가 왜 탄생했는지, 기본적인 구조가 어떻게 되는지 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* [MongoDB](http://www.mongodb.org)가 무엇인지와, 사용하는 명령어들을 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* `HTML5` 및 `CSS` UPPERCASE는 웹 애플리케이션 개발에 사용되기 때문에, HTML5와 CSS를 알고 있으면 더욱 쉽게 접근할 수 있습니다.
* `Git` UPPERCASE는 Git을 이용해 설치 및 업그레이드를 수행합니다.

## 그럼 설치해 봅시다.
아래의 순서대로 설치를 진행합니다.

1. UPPERCASE의 기반 시스템들을 설치합니다. 기반 시스템들은 다음과 같습니다. UPPERCASE의 전체 기능을 모두 사용하기 위해서는 전부 설치해야합니다. 그러나 부분적인 기능만 사용하는 경우에는, 아래 설명에 맞게 선택적으로 설치할 수 있습니다.

    * [Node.js](http://nodejs.org) - 웹 브라우저 관련 기능들만 사용하는 등 Node.js 관련 기능을 전혀 사용하지 않는 경우에는 설치하지 않아도 됩니다.
    * [ImageMagick](http://www.imagemagick.org) - 업로드 관련 기능을 사용하지 않는 경우에는 설치하지 않아도 됩니다.
    * [MongoDB](http://www.mongodb.org) - 데이터를 저장할 필요가 없는 경우에는 설치하지 않아도 됩니다.
	* [Redis](http://redis.io) - `REDIS_STORE` 등 Redis 관련 기능을 사용하지 않는 경우에는 설치하지 않아도 됩니다. (설치하는 경우 3.0.7 버전을 설치해 주시기 바랍니다.)

2. `Git`을 이용하여 UPPERCASE를 적당한 곳에 `clone`합니다. [git 간편 안내서](http://rogerdudler.github.io/git-guide/index.ko.html)

	```
    git clone https://github.com/Hanul/UPPERCASE.git
    ```

3. UPPERCASE의 위치를 환경 변수에 등록합니다.

	* 운영체제가 `Windows`라면, `내 컴퓨터 - 속성 - 고급 시스템 설정 - 환경 변수`에서 `UPPERCASE_PATH`에 UPPERCASE의 위치를 등록합니다. (CMD가 켜져 있는 경우, 환경 변수를 적용하기 위해서는 환경 변수 등록 후에 CMD를 종료했다가 다시 실행해야 합니다.)
	
	* 운영체제가 `Mac`이라면, 터미널에서 아래와 같이 입력합니다. 이후 터미널을 다시 실행하면 반영됩니다.

        ```
        vi .profile
        export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
        ```

	* 운영체제가 `Linux`라면, 터미널에서 아래와 같이 입력합니다. 이후 터미널을 다시 실행하면 반영됩니다.

        ```
        vi .bash_profile
        혹은
        vi .profile
        export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
        ```

## [UPPERCASE 코드 컨벤션 규칙](CONVENTION.md)
UPPERCASE를 구현할 때와 UPPERCASE 기반 프로젝트를 개발할 때는 이 규칙에 따라 개발합니다.

## [UPPERCASE-CORE](CORE.md)
UPPERCASE-CORE는 UPPERCASE의 가장 근간을 되는 기능들을 담고 있습니다. UPPERCASE의 모든 기능들은 이를 기반으로 합니다.
