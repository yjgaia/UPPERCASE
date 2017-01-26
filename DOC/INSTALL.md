# 설치하기

1. UPPERCASE의 기반 시스템들을 설치합니다. 기반 시스템들은 다음과 같습니다.

    * [Node.js](http://nodejs.org)
    * [ImageMagick](http://www.imagemagick.org)
    * [MongoDB](http://www.mongodb.org)

2. `Git`을 이용하여 UPPERCASE를 적당한 곳에 `clone`합니다. [git 간편 안내서](http://rogerdudler.github.io/git-guide/index.ko.html)를 참고하세요.

	```
    git clone https://github.com/Hanul/UPPERCASE.git
    ```

3. UPPERCASE의 위치를 환경 변수에 등록합니다.

    ##### 운영체제가 Windows인 경우
	`내 컴퓨터 - 속성 - 고급 시스템 설정 - 환경 변수`에서 `UPPERCASE_PATH`에 UPPERCASE의 위치를 등록합니다. (CMD가 켜져 있는 경우, 환경 변수를 적용하기 위해서는 환경 변수 등록 후에 CMD를 종료했다가 다시 실행해야 합니다.)
	
	##### 운영체제가 Mac인 경우
	터미널에서 아래와 같이 입력합니다. 이후 터미널을 종료했다가 다시 실행하면 반영됩니다.
    ```
    vi .profile
    export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
    ```
	
	##### 운영체제가 Linux인 경우
	터미널에서 아래와 같이 입력합니다. 이후 터미널을 종료했다가 다시 실행하면 반영됩니다.
    ```
    vi .bash_profile
    혹은
    vi .profile
    export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
    ```

UPPERCASE의 전체 기능을 모두 사용하기 위해서는 전부 설치해야합니다. 그러나 부분적인 기능만 사용하는 경우에는, 아래 설명에 맞게 선택적으로 설치할 수 있습니다.

* [Node.js](http://nodejs.org) - 웹 브라우저 관련 기능들만 사용하는 등 Node.js 관련 기능을 전혀 사용하지 않는 경우에는 설치하지 않아도 됩니다.
* [ImageMagick](http://www.imagemagick.org) - [이미지 처리 기능](DOC/GUIDE/UPPERCASE-CORE-NODE.md#%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B2%98%EB%A6%AC-%EA%B8%B0%EB%8A%A5) 혹은 [업로드 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-NODE.md#업로드-기능을-제공하는-웹-서버)을 사용하지 않는 경우에는 설치하지 않아도 됩니다.
* [MongoDB](http://www.mongodb.org) - 데이터를 저장할 필요가 없는 경우에는 설치하지 않아도 됩니다.

### MongoDB 사용 시 주의사항
* **MongoDB는 32bit 컴퓨터에서는 심각한 제한이 있습니다. 32bit 컴퓨터가 다룰 수 있는 크기가 최대 4gb 이기 때문입니다. 따라서 실제 운영 시에는 반드시 64bit 운영체제 위에서 구동하시기 바랍니다.**

## 업데이트
UPPERCASE가 설치된 폴더로 이동하여 `git push` 명령을 실행합니다.
```
cd UPPERCASE
git push
```