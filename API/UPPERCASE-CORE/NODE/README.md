# NODE API
* [BOX.md](BOX.md) BOX를 생성합니다.
* [NODE_CONFIG.md](NODE_CONFIG.md) Node.js 환경에서의 기본 설정

## [CLUSTERING](CLUSTERING/README.md)
* [CLUSTERING/CPU_CLUSTERING.md](CLUSTERING/CPU_CLUSTERING.md) CPU 코어 간 클러스터링을 수행합니다.
* [CLUSTERING/SERVER_CLUSTERING.md](CLUSTERING/SERVER_CLUSTERING.md) 서버 간 클러스터링을 수행합니다.
* [CLUSTERING/SHARED_STORE.md](CLUSTERING/SHARED_STORE.md) 클러스터링 공유 저장소를 생성하는 클래스

## [CONSOLE](CONSOLE/README.md)
* [CONSOLE/CONSOLE_BLUE.md](CONSOLE/CONSOLE_BLUE.md) 콘솔에 표시할 텍스트를 파란색으로 설정합니다.
* [CONSOLE/CONSOLE_GREEN.md](CONSOLE/CONSOLE_GREEN.md) 콘솔에 표시할 텍스트를 초록색으로 설정합니다.
* [CONSOLE/CONSOLE_RED.md](CONSOLE/CONSOLE_RED.md) 콘솔에 표시할 텍스트를 빨간색으로 설정합니다.
* [CONSOLE/CONSOLE_YELLOW.md](CONSOLE/CONSOLE_YELLOW.md) 콘솔에 표시할 텍스트를 노란색으로 설정합니다.
* [CONSOLE/SHOW_ERROR.md](CONSOLE/SHOW_ERROR.md) 콘솔에 오류 메시지를 출력합니다.
* [CONSOLE/SHOW_WARNING.md](CONSOLE/SHOW_WARNING.md) 콘솔에 경고 메시지를 출력합니다.

## [ENCRYPTION](ENCRYPTION/README.md)
* [ENCRYPTION/SHA256.md](ENCRYPTION/SHA256.md) 비밀번호를 주어진 키를 이용하여 HMAC SHA256 알고리즘으로 암호화 합니다.
* [ENCRYPTION/SHA512.md](ENCRYPTION/SHA512.md) 비밀번호를 주어진 키를 이용하여 HMAC SHA512 알고리즘으로 암호화 합니다.

## [FILE](FILE/README.md)
* [FILE/CHECK_FILE_EXISTS.md](FILE/CHECK_FILE_EXISTS.md) 지정된 경로에 파일이나 폴더가 존재하는지 확인합니다.
* [FILE/CHECK_IS_FOLDER.md](FILE/CHECK_IS_FOLDER.md) 지정된 경로가 (파일이 아닌) 폴더인지 확인합니다.
* [FILE/COPY_FILE.md](FILE/COPY_FILE.md) 파일을 복사합니다.
* [FILE/CREATE_FOLDER.md](FILE/CREATE_FOLDER.md) 폴더를 생성합니다.
* [FILE/FIND_FILE_NAMES.md](FILE/FIND_FILE_NAMES.md) 지정된 경로에 위치한 파일들의 이름 목록을 불러옵니다.
* [FILE/FIND_FOLDER_NAMES.md](FILE/FIND_FOLDER_NAMES.md) 지정된 경로에 위치한 폴더들의 이름 목록을 불러옵니다.
* [FILE/GET_FILE_INFO.md](FILE/GET_FILE_INFO.md) 파일의 정보를 불러옵니다.  파일의 크기(size), 생성 시간(createTime), 최종 수정 시간(lastUpdateTime)을 불러옵니다.
* [FILE/MOVE_FILE.md](FILE/MOVE_FILE.md) 파일의 위치를 이동시킵니다.
* [FILE/READ_FILE.md](FILE/READ_FILE.md) 파일의 내용을 불러옵니다.  내용을 Buffer형으로 불러오기 때문에, 내용을 문자열로 불러오려면 toString 함수를 이용하시기 바랍니다.
* [FILE/REMOVE_FILE.md](FILE/REMOVE_FILE.md) 파일을 삭제합니다.
* [FILE/REMOVE_FOLDER.md](FILE/REMOVE_FOLDER.md) 폴더를 삭제합니다.  폴더 내의 모든 파일 및 폴더를 삭제하므로, 주의해서 사용해야 합니다.
* [FILE/WRITE_FILE.md](FILE/WRITE_FILE.md) 파일을 작성합니다.  파일이 없으면 파일을 생성하고, 파일이 이미 있으면 내용을 덮어씁니다.

## [IMAGEMAGICK](IMAGEMAGICK/README.md)
* [IMAGEMAGICK/IMAGEMAGICK_CONVERT.md](IMAGEMAGICK/IMAGEMAGICK_CONVERT.md) ImageMagick의 convert 기능을 사용합니다.
* [IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.md](IMAGEMAGICK/IMAGEMAGICK_IDENTIFY.md) ImageMagick의 identify 기능을 사용합니다.
* [IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.md](IMAGEMAGICK/IMAGEMAGICK_READ_METADATA.md) ImageMagick을 이용해 이미지의 메타데이터를 반한홥니다.
* [IMAGEMAGICK/IMAGEMAGICK_RESIZE.md](IMAGEMAGICK/IMAGEMAGICK_RESIZE.md) ImageMagick을 사용해 이미지의 크기를 조절하여 새 파일로 저장합니다.

## [MINFIY](MINFIY/README.md)
* [MINFIY/MINIFY_CSS.md](MINFIY/MINIFY_CSS.md) CSS 코드를 압축합니다.
* [MINFIY/MINIFY_JS.md](MINFIY/MINIFY_JS.md) JavaScript 코드를 압축합니다.

## [REQUEST](REQUEST/README.md)
* [REQUEST/DELETE.md](REQUEST/DELETE.md) HTTP DELETE 요청을 보냅니다.
* [REQUEST/DOWNLOAD.md](REQUEST/DOWNLOAD.md) HTTP 리소스를 다운로드합니다.
* [REQUEST/GET.md](REQUEST/GET.md) HTTP GET 요청을 보냅니다.
* [REQUEST/POST.md](REQUEST/POST.md) HTTP POST 요청을 보냅니다.
* [REQUEST/PUT.md](REQUEST/PUT.md) HTTP PUT 요청을 보냅니다.
* [REQUEST/REQUEST.md](REQUEST/REQUEST.md) HTTP 요청을 보냅니다.

## [SERVER](SERVER/README.md)
* [SERVER/CONNECT_TO_SOCKET_SERVER.md](SERVER/CONNECT_TO_SOCKET_SERVER.md) SOCKET_SERVER로 생성한 TCP 소켓 서버에 연결합니다.
* [SERVER/MULTI_PROTOCOL_SOCKET_SERVER.md](SERVER/MULTI_PROTOCOL_SOCKET_SERVER.md) TCP 소켓 및 웹 소켓 서버를 통합하여 생성합니다.
* [SERVER/SOCKET_SERVER.md](SERVER/SOCKET_SERVER.md) TCP 소켓 서버를 생성합니다.
* [SERVER/UDP_SERVER.md](SERVER/UDP_SERVER.md) UDP 소켓 서버를 생성하는 CLASS
* [SERVER/WEB_SERVER.md](SERVER/WEB_SERVER.md) 웹 서버를 생성하는 클래스
* [SERVER/WEB_SOCKET_SERVER.md](SERVER/WEB_SOCKET_SERVER.md) 웹 소켓 서버를 생성합니다.

## [SYSTEM](SYSTEM/README.md)
* [SYSTEM/CPU_USAGES.md](SYSTEM/CPU_USAGES.md) CPU 각 코어 당 사용률을 반환합니다.
* [SYSTEM/DISK_USAGE.md](SYSTEM/DISK_USAGE.md) 디스크 사용률을 반환합니다.
* [SYSTEM/MEMORY_USAGE.md](SYSTEM/MEMORY_USAGE.md) 메모리 사용률을 반환합니다.
* [SYSTEM/RUN_SCHEDULE_DAEMON.md](SYSTEM/RUN_SCHEDULE_DAEMON.md) 매일 정해진 시간마다 주어진 터미널 명령어들을 실행하는 데몬을 구동합니다.