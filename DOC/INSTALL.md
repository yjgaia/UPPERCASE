# UPPERCASE 설치하기

1. 기반 시스템을 설치합니다. 기반 시스템은 다음과 같습니다.

    * [Node.js](http://nodejs.org)
    * [ImageMagick](http://www.imagemagick.org)
    * [MongoDB](http://www.mongodb.org)
	* (REDIS_STORE를 사용할 경우) [Redis](http://redis.io)
    
2. git을 이용하여 UPPERCASE를 적당한 곳에 clone합니다. [git 간편 안내서](http://rogerdudler.github.io/git-guide/index.ko.html)

	```
    git clone https://github.com/Hanul/UPPERCASE.git
    ```

3. UPPERCASE를 clone한 곳을 환경 변수에 등록합니다.

	* `Windows` 내 컴퓨터 - 속성 - 고급 시스템 설정 - 환경 변수에서 `UPPERCASE_PATH`에 clone 한 폴더 위치를 등록합니다. (등록 후 CMD를 껏다가 다시 켜야 합니다.)
	* `Mac`

        ```
        vi .profile
        export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
        ```

	* `Linux`

        ```
        vi .bash_profile
        혹은
        vi .profile
        export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
        ```

	`.profile` 혹은 `.bash_profile` 파일이 변경된 경우 터미널을 껏다 켜주시기 바랍니다.

4. [프로젝트를 생성](CREATE_PROJECT.md)합니다.

다음 문서: [프로젝트 생성](CREATE_PROJECT.md)
