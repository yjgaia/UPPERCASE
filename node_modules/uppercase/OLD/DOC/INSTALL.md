# UPPERCASE 설치하기

1. UPPERCASE의 기반 시스템들을 설치합니다. 기반 시스템들은 다음과 같습니다. 이 페이지의 하단에 설치 방법을 각각 설명해 두었습니다.

	* [Node.js](http://nodejs.org)
	* [GraphicsMagick](http://www.graphicsmagick.org)
	* [MongoDB](http://www.mongodb.org)

2. `Git`을 이용하여 UPPERCASE를 적당한 곳에 `clone`합니다. `Git`에 대해서는 [Git 간편 안내서](http://rogerdudler.github.io/git-guide/index.ko.html)를 참고하시기 바랍니다.

	```
	git clone https://github.com/Hanul/UPPERCASE.git
	```

3. UPPERCASE의 경로를 환경 변수에 등록합니다.

	##### 운영체제가 Windows인 경우
	`내 PC`를 오른클릭하여 `속성 - 고급 시스템 설정 - 환경 변수 - 시스템 변수`에서 `UPPERCASE_PATH`에 UPPERCASE의 경로를 등록합니다. (CMD가 켜져 있는 경우, 환경 변수를 적용하기 위해서는 환경 변수 등록 후에 CMD를 종료했다가 다시 실행해야 합니다.)
	
	![WINDOWS_PATH](https://raw.githubusercontent.com/Hanul/UPPERCASE/master/DOC/INSTALL/WINDOWS_PATH.png)
	##### 운영체제가 Mac인 경우
	터미널에서 아래와 같이 입력합니다. 이후 터미널을 종료했다가 다시 실행합니다.
	```
	vi .profile
	export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
	source .profile
	```
	
	##### 운영체제가 Linux인 경우
	터미널에서 아래와 같이 입력합니다. 이후 터미널을 종료했다가 다시 실행합니다.
	```
	vi .bash_profile
	혹은
	vi .profile
	
	export UPPERCASE_PATH="{{clone 한 폴더 위치}}"
	
	source .bash_profile
	혹은
	source .profile
	```

4. 모든 설치가 완료되었습니다.

## UPPERCASE 업데이트
1. [릴리즈 노트](RELEASE.md)를 참고하여 프로젝트를 수정합니다.

2. UPPERCASE가 설치된 경로로 이동하여 `git pull` 명령을 실행합니다.

	```
	cd UPPERCASE
	git pull
	```

3. 실행중인 프로젝트가 있다면, 재시작 합니다.

## Node.js 설치
CentOS 8을 기준으로 설명합니다.

`dnf`로 Node.js를 설치합니다.

```
dnf install -y epel-release
dnf install -y nodejs
```

이후 `npm`을 이용해 `n` 모듈을 설치합니다.

```
npm install -g n
```

아래 명령어를 사용해 Node.js 최신 버전을 설치합니다.

```
n lts
```

## GraphicsMagick 설치
CentOS 8을 기준으로 설명합니다.

아래 명령과 같이 `dnf`로 설치합니다.

```
dnf install -y epel-release
dnf install -y GraphicsMagick GraphicsMagick-devel GraphicsMagick-perl
```

## MongoDB 설치
CentOS 8을 기준으로, 아래 문서를 따라 설치 과정을 수행합니다.

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/
