# UJS-NODE
Node.js 환경에서 사용할 수 있는 유틸리티 라이브러리입니다.

## 파일 처리
파일을 처리하는 다양한 기능들을 소개합니다. 아래 기능들은 `isSync` 파라미터로 callback 없이 바로 처리할 수 있지만, 처리하는 동안 프로세스가 멈추게 되어 성능이 떨어집니다. 특수한 경우가 아니라면 `isSync` 파라미터를 사용하지 마세요.

* `WRITE_FILE` 파일에 내용을 작성합니다. 파일이 없으면 파일을 생성합니다. [예제보기](../EXAMPLES/NODE/FILE/WRITE_FILE.js)
    * `WRITE_FILE({path:, content:}, callbackOrHandlers)`
    * `WRITE_FILE({path:, buffer:}, callbackOrHandlers)`
    * `WRITE_FILE({path:, content: isSync:})`

    ```javascript
    WRITE_FILE({
		path : 'some.txt',
		content : 'this is text file.'
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		success : function() {
			console.log('success.');
		}
	})
    ```

* `READ_FILE` 파일을 읽어들입니다. `buffer` 형태로 읽어들이기 때문에, 문자열로 변환하려면 `toString` 함수를 이용하시기 바랍니다. [예제보기](../EXAMPLES/NODE/FILE/READ_FILE.js)
    * `READ_FILE(path, callbackOrHandlers)`
    * `READ_FILE({path:, isSync:})`
    
    ```javascript
    READ_FILE('some.txt', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(buffer) {
			console.log(buffer.toString());
		}
	})
    ```

* `GET_FILE_INFO` 파일의 정보를 읽어들입니다. 파일의 크기(`size`), 생성 시간(`createTime`), 최종 수정 시간(`lastUpdateTime`)을 불러옵니다. [예제보기](../EXAMPLES/NODE/FILE/GET_FILE_INFO.js)
    * `GET_FILE_INFO(path, callbackOrHandlers)`
    * `GET_FILE_INFO({path:, isSync:})`
    
    ```javascript
    GET_FILE_INFO('some.txt', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(info) {
			// info.size
			// info.createTime
			// info.lastUpdateTime
			console.log(info);
		}
	})
    ```

* `COPY_FILE` 파일을 복사합니다. [예제보기](../EXAMPLES/NODE/FILE/COPY_FILE.js)
    * `COPY_FILE({from:, to:}, callbackOrHandlers)`
    * `COPY_FILE({from:, to:, isSync:})`

    ```javascript
    COPY_FILE({
		from : 'from.txt',
		to : 'to.txt'
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function() {
			console.log('success.');
		}
	});
	```

* `MOVE_FILE` 파일을 옮깁니다. [예제보기](../EXAMPLES/NODE/FILE/MOVE_FILE.js)
    * `MOVE_FILE({from:, to:}, callbackOrHandlers)`
    * `MOVE_FILE({from:, to:, isSync:})`

    ```javascript
    MOVE_FILE({
		from : 'from.txt',
		to : 'to.txt'
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function() {
			console.log('success.');
		}
	});
	```
	
* `REMOVE_FILE` 파일을 삭제합니다. [예제보기](../EXAMPLES/NODE/FILE/REMOVE_FILE.js)
    * `REMOVE_FILE(path, callbackOrHandlers)`
    * `REMOVE_FILE({path:, isSync:})`

    ```javascript
    REMOVE_FILE('some.txt', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function() {
			console.log('success.');
		}
	})
    ```

* `CREATE_FOLDER` 폴더를 생성합니다. [예제보기](../EXAMPLES/NODE/FILE/CREATE_FOLDER.js)
    * `CREATE_FOLDER(path, callbackOrHandlers)`
    * `CREATE_FOLDER({path:, isSync:})`

    ```javascript
    CREATE_FOLDER('some_folder', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		success : function() {
			console.log('success.');
		}
	})
    ```
	
* `REMOVE_FOLDER` 폴더를 삭제합니다. 폴더 내의 모든 파일 및 폴더를 삭제하므로, 주의하여 사용해야 합니다. [예제보기](../EXAMPLES/NODE/FILE/REMOVE_FOLDER.js)
    * `REMOVE_FOLDER(path, callbackOrHandlers)`
    * `REMOVE_FOLDER({path:, isSync:})`

    ```javascript
    REMOVE_FOLDER('someFolder', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function() {
			console.log('success.');
		}
	})
    ```

* `FIND_FILE_NAMES` 특정 폴더 내에서 폴더를 제외한 파일들의 이름을 찾습니다. [예제보기](../EXAMPLES/NODE/FILE/FIND_FILE_NAMES.js)
    * `FIND_FILE_NAMES(path, callbackOrHandlers)`
    * `FIND_FILE_NAMES({path:, isSync:})`

    ```javascript
    FIND_FILE_NAMES('some_folder', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(fileNames) {
			console.log(fileNames);
		}
	})
    ```
    
* `FIND_FOLDER_NAMES` 특정 폴더 내에서 파일을 제외한 폴더들의 이름을 찾습니다. [예제보기](../EXAMPLES/NODE/FILE/FIND_FOLDER_NAMES.js)
    * `FIND_FOLDER_NAMES(path, callbackOrHandlers)`
    * `FIND_FOLDER_NAMES({path:, isSync:})`

    ```javascript
    FIND_FOLDER_NAMES('some_folder', {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		notExists : function() {
			console.log('not exists.');
		},
		success : function(folderNames) {
			console.log(folderNames);
		}
	})
    ```
    
## HTTP 요청 관련 기능
* `REQUEST` HTTP 요청을 보냅니다. [예제보기](../EXAMPLES/NODE/REQUEST/REQUEST.js)
    * `REQUEST({host:, port:, method:, uri:}, responseListenerOrListeners)`
    * `REQUEST({host:, method:, uri:, paramStr:}, responseListenerOrListeners)`
    * `REQUEST({host:, port:, isSecure:, method:, uri:, data:}, responseListenerOrListeners)`

    ```javascript
    REQUEST({
		host : 'github.com',
		isSecure : true,
		method : 'GET',
		uri : 'Hanul/UJS'
	}, function(content) {
		...
	})
	```
	
* `GET` `method`가 `GET`인 HTTP 요청을 보냅니다. [예제보기](../EXAMPLES/NODE/REQUEST/GET.js)
	* `GET(url, responseListenerOrListeners)`
    * `GET({host:, port:, uri:, paramStr:, data:}, responseListenerOrListeners)`
    * `GET({host:, port:, isSecure:, uri:}, responseListenerOrListeners)`

    ```javascript
    GET({
		host : 'github.com',
		isSecure : true,
		uri : 'Hanul/UJS'
	}, function(content) {
		...
	})
	```
	
* `POST` `method`가 `POST`인 HTTP 요청을 보냅니다. [예제보기](../EXAMPLES/NODE/REQUEST/POST.js)
    * `POST({host:, port:, uri:, paramStr:}, responseListenerOrListeners)`
    * `POST({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `PUT` `method`가 `PUT`인 HTTP 요청을 보냅니다. [예제보기](../EXAMPLES/NODE/REQUEST/PUT.js)
    * `PUT({host:, port:, uri:, paramStr:}, responseListenerOrListeners)`
    * `PUT({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `DELETE` `method`가 `DELETE`인 HTTP 요청을 보냅니다. [예제보기](../EXAMPLES/NODE/REQUEST/DELETE.js)
    * `DELETE({host:, port:, uri:, paramStr:}, responseListenerOrListeners)`
    * `DELETE({host:, port:, isSecure:, uri:, data:}, responseListenerOrListeners)`

* `DOWNLOAD` 웹 리소스를 다운로드 합니다. [예제보기](../EXAMPLES/NODE/REQUEST/DOWNLOAD.js)
    * `DOWNLOAD({url:, path:}, callbackOrHandlers)`
    * `DOWNLOAD({host:, port:, uri:, paramStr:, data:, path:}, callbackOrHandlers)`
    * `DOWNLOAD({host:, port:, isSecure:, uri:, path:}, callbackOrHandlers)`

    ```javascript
    DOWNLOAD({
		host : 'github.com',
		uri : 'Hanul/UJS/archive/master.zip',
		isSecure : true,
		path : 'UJS.zip'
	})
	```

## 각종 서버 구현체들
* `SOCKET_SERVER(port, connectionListener)` 소켓 서버를 생성합니다. [예제보기](../EXAMPLES/NODE/SERVER/SOCKET_SERVER.js)

    ```javascript
    SOCKET_SERVER(8124, function(clientInfo, on, off, send, disconnect) {

        // ip
		clientInfo.ip
		
		// send to client.
		send({
			methodName : 'message',
			data : {
				msg : 'message from server.'
			}
		}, function(retMsg) {
			console.log(retMsg);
		});

        // receive from client.
		on('message', function(data, ret) {
			console.log(data);
			ret('Thanks!');
		});

		// when disconnected
		on('__DISCONNECTED', function() {
			console.log('DISCONNECTED!');
		});
	})
	```
	
	* 소켓 서버에서 접속자 수 가져오기 예제
	```javascript
	var
	// connection db
	connectionDB = SHARED_DB('connectionDB');
	
	// 초기화
	connectionDB.save({
		id : 'connectionCountInfo',
		data : {
			count : 0
		}
	});
	
    SOCKET_SERVER(8124, function(clientInfo, on, off, send, disconnect) {
    
		// 새로운 유저 접속 시 count를 1 올림
		connectionDB.update({
			id : 'connectionCountInfo',
			data : {
				$inc : {
					count : 1
				}
			}
		});
		
		// 접속이 끊어질 경우
		on('__DISCONNECTED', function() {
			
			// count를 1 내림
			connectionDB.update({
				id : 'connectionCountInfo',
				data : {
					$inc : {
						count : -1
					}
				}
			});
		});
		
		// 접속자 수 전송
		on('getConnectionCount', function(notUsing, ret) {
			ret(connectionDB.get('connectionCountInfo').count);
		});
	})
	```

* `CONNECT_TO_SOCKET_SERVER({host:, port:}, connectionListenerOrListeners)` `SOCKET_SERVER`로 만들어진 소켓 서버에 연결합니다. [예제보기](../EXAMPLES/NODE/CONNECT/CONNECT_TO_SOCKET_SERVER.js)

    ```javascript
    CONNECT_TO_SOCKET_SERVER({
		host : 'localhost',
		port : 8124
	}, {
		error : function(errorMsg) {
			console.log('error:', errorMsg);
		},
		success : function(on, off, send, disconnect) {

			// send to client.
    		send({
    			methodName : 'message',
    			data : {
    				msg : 'message from server.'
    			}
    		}, function(retMsg) {
    			console.log(retMsg);
    		});
    
            // receive from client.
    		on('message', function(data, ret) {
    			console.log(data);
    			ret('Thanks!');
    		});
    
    		// when disconnected
    		on('__DISCONNECTED', function() {
    			console.log('DISCONNECTED!');
    		});
		}
	})
	```
	
* `WEB_SERVER` 웹 서버를 생성합니다. `response` 함수로 클라이언트에 응답할 때, `version` 파라미터를 지정하면 응답이 캐싱됩니다. [예제보기](../EXAMPLES/NODE/SERVER/WEB_SERVER.js)
    * `WEB_SERVER(port, requestListener)`
    * `WEB_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:}, requestListener)`

    ```javascript
    WEB_SERVER(8123, function(requestInfo, response, onDisconnected) {
    
        // ip
        requestInfo.ip

		response('Welcome to UJS web server!');
		// or
		response({
			buffer : ...,
			headers : {
			    ...
			}
		});
	})
    ```
    
* `RESOURCE_SERVER` 각종 리소스들을 제공하기 위한 서버를 생성합니다. 기본적으로 리소스의 응답을 캐싱합니다. 캐싱을 원하지 않을 경우, `CONFIG.isDevMode`를 true로 설정하시면 됩니다. 자세한 내용은 [Configuration](CONFIG.md) 문서를 참고해주세요. [예제보기](../EXAMPLES/NODE/SERVER/RESOURCE_SERVER.js)
    * `RESOURCE_SERVER({port:, rootPath:}, requestListenerOrHandlers)`
    * `RESOURCE_SERVER({port:, rootPath:, version:}, requestListenerOrHandlers)`
    * `RESOURCE_SERVER({securedPort:, securedKeyFilePath:, securedCertFilePath:, rootPath:}, requestListenerOrHandlers)`

    ```javascript
    // R 폴더에 있는 리소스의 경로와 URI를 비교하여, 해당하는 리소스를 제공합니다.
    // 이를테면 R 폴더에 image.png가 존재한다면, http://localhost:8123/image.png 로 접속하면 해당 이미지가 제공됩니다.
    RESOURCE_SERVER({
		port : 8123,
		rootPath : __dirname + '/R'
	})
	```

* `UDP_SERVER` UDP 프로토콜로 통신하는 서버를 생성합니다. [예제보기](../EXAMPLES/NODE/SERVER/UDP_SERVER.js)
    * `UDP_SERVER(port, requestListener)`
    * `UDP_SERVER({port:, ipVersion}, requestListener)`

    ```javascript
    UDP_SERVER(8124, function(requestInfo, response) {
        
        // request informations
        requestInfo.ip
        requestInfo.port
        requestInfo.content

		response('Welcome to UJS UDP server!');
	})
    ```

## 암호화
암호화는 `HMAC-SHA` 알고리즘 중 `HMAC-SHA1`, `HMAC-SHA256`, `HMAC-SHA512` 세가지를 지원합니다. 현재까지 취약점이 발견되지 않은 `HMAC-SHA256` 사용을 추천합니다.

* `SHA1({password:, key:})` HMAC-SHA1 암호화 알고리즘을 거친 문자열을 생성합니다. 암호화에는 암호화 될 대상이 되는 `password`와, 암호화에 필요한 `key`가 필요합니다. [예제보기](../EXAMPLES/NODE/ENCRYPTION/SHA1.js)

    ```javascript
    // '16dd1fdd7c595eab4586cebba6b34eaff41acc53'
    SHA1({
		password : '1234',
		key : 'test'
	})
	```

* `SHA256({password:, key:})` HMAC-SHA256 암호화 알고리즘을 거친 문자열을 생성합니다. 암호화에는 암호화 될 대상이 되는 `password`와, 암호화에 필요한 `key`가 필요합니다. [예제보기](../EXAMPLES/NODE/ENCRYPTION/SHA256.js)

    ```javascript
    // '5471d39e681ffc00128c11b573f4a3356ceba766956bb928d562d2c7c0c2db6a'
    SHA256({
		password : '1234',
		key : 'test'
	})
	```

* `SHA512({password:, key:})` HMAC-SHA512 암호화 알고리즘을 거친 문자열을 생성합니다. 암호화에는 암호화 될 대상이 되는 `password`와, 암호화에 필요한 `key`가 필요합니다. [예제보기](../EXAMPLES/NODE/ENCRYPTION/SHA512.js)

    ```javascript
    // 'ae451e84ce797ab519f454e9e3c9220550a5119c1063f75837281e4157c91cf27ec3d7a38df3254cdbc4c108189ed4b8d904baf2320a23d5268b1e81c110343b'
    SHA512({
		password : '1234',
		key : 'test'
	})
	```

## 클러스터링 관련 기능
* `CPU_CLUSTERING(work)` CPU 클러스터링을 수행합니다. 이를 통해 멀티코어 CPU에 대응할 수 있습니다. [예제보기](../EXAMPLES/NODE/CLUSTERING/CPU_CLUSTERING.js)

    ```javascript
    CPU_CLUSTERING(function() {
    
        // 1, 2, 3, 4, ... (CPU count)
        // 만약 싱글코어로 실행하는 경우에는 1
        CPU_CLUSTERING.getWorkerId()
        
        ...
	})
    ```

* `SERVER_CLUSTERING({hosts:, thisServerName:, port:}, work)` 서버 클러스터링을 수행합니다. 이를 통해 분산 서버를 구성할 수 있습니다. [예제보기](../EXAMPLES/NODE/CLUSTERING/SERVER_CLUSTERING.js)

    ```javascript
    SERVER_CLUSTERING({
		hosts : {
			serverA : '127.0.0.1',
			serverB : '127.0.0.1'
		},
		thisServerName : 'serverA',
		port : 8125
	}, function() {
	    ...
	})
    ```

* `SHARED_STORE(name)` 클러스터링 된 CPU들과 서버들이 공유하는 저장소입니다. [예제보기](../EXAMPLES/NODE/CLUSTERING/SHARED_STORE.js)
	* `save({name:, value:, removeAfterSeconds:})` 특정 `name`에 `value`를 저장합니다. `removeAfterSeconds` 파라미터를 지정하면 특정 시간 이후 값이 자동으로 지워집니다.
	* `get(name)` `name`의 값을 가져옵니다.
	* `remove(name)` `name`의 값을 지웁니다.
	* `list()` 저장소의 모든 값을 가져옵니다.
	* `count()` 저장소의 값들의 개수를 가져옵니다.
	* `clear()` 저장소의 모든 값을 삭제합니다.
	
    ```javascript
    CPU_CLUSTERING(function() {

		SERVER_CLUSTERING({
			hosts : {
				serverA : '127.0.0.1',
				serverB : '127.0.0.1'
			},
			thisServerName : 'serverA',
			port : 8125
		}, function() {

			var
			// shared store
			sharedStore = SHARED_STORE('sharedStore');

			if (CPU_CLUSTERING.getWorkerId() === 1) {

				sharedStore.save({
					name : 'msg',
					value : 'Hello World!',
					removeAfterSeconds : 2
				});
			}
			
			sharedStore.get('msg');
			
			sharedStore.remove('msg');
		});
	});
    ```

* `CPU_SHARED_STORE(name)` CPU들이 공유하는 저장소입니다. 사용법은 `SHARED_STORE`와 같습니다. [예제보기](../EXAMPLES/NODE/CLUSTERING/CPU_SHARED_STORE.js)

* `SHARED_DB(name)` 클러스터링 된 CPU들과 서버들이 공유하는 데이터베이스입니다. *동시에 데이터가 수정되는 경우에는 서버 간 데이터의 싱크가 맞지 않을 수 있으므로, 이를 염두해 두고 로직을 작성하시기 바랍니다.* [예제보기](../EXAMPLES/NODE/CLUSTERING/SHARED_DB.js)
	* `save({id:, data:, removeAfterSeconds:})` 특정 `id`에 `data`를 저장합니다. `removeAfterSeconds` 파라미터를 지정하면 특정 시간 이후 데이터가 자동으로 지워집니다.
	* `update({id:, data:, removeAfterSeconds:})` 특정 `id`의 `data`를 수정합니다. `removeAfterSeconds` 파라미터를 지정하면 특정 시간 이후 데이터가 자동으로 지워집니다.
	* `get(id)` `id`의 데이터를 가져옵니다. 값이 없는 경우 `undefined`가 반환됩니다.
	* `remove(id)` `id`의 데이터를 지웁니다.
	* `list()` 저장소의 모든 값을 가져옵니다.
	* `count()` 저장소의 값들의 개수를 가져옵니다.
	* `clear()` 저장소의 모든 값을 삭제합니다.

    ```javascript
    CPU_CLUSTERING(function() {

		SERVER_CLUSTERING({
			hosts : {
				serverA : '127.0.0.1',
				serverB : '127.0.0.1'
			},
			thisServerName : 'serverA',
			port : 8125
		}, function() {

			var
			// shared db
			sharedDB = TestBox.CPU_SHARED_DB('test');

			if (CPU_CLUSTERING.getWorkerId() === 1) {

				sharedDB.save({
					id : '1234',
					data : {
						msg : 'Hello World!'
					},
					removeAfterSeconds : 2
				});
			}
			
			sharedDB.get('1234')
			
			sharedDB.remove('1234')
		});
	});
    ```
    
    `update` 명령의 `data`에 다음과 같은 특수기호를 사용하여 데이터를 가공할 수 있습니다. 이를 통해 분산 프로세스 간 *데이터 동시성*을 유지할 수 있습니다. 그러나, *동시에 데이터가 수정되는 경우에는 서버 간 데이터의 싱크가 맞지 않을 수 있으므로, 이를 염두해 두고 로직을 작성하시기 바랍니다.*
    * `$inc`
    ```javascript
    // num이 2 증가합니다.
    sharedDB.update({
        ...
        data : {
            $inc : {
                num : 2
            }
        }
    })
    ```
    ```javascript
    // num이 2 감소합니다.
    sharedDB.update({
        ...
        data : {
            $inc : {
                num : -2
            }
        }
    })
    ```
    * `$addToSet`
    ```javascript
    // 배열 array에 3이 없는 경우에만 3을 추가합니다.
    sharedDB.update({
        ...
        data : {
            $addToSet : {
                array : 3
            }
        }
    })
    ```
    * `$push`
    ```javascript
    // 배열 array에 3을 추가합니다.
    sharedDB.update({
        ...
        data : {
            $push : {
                array : 3
            }
        }
    })
    ```
    * `$pull`
    ```javascript
    // 배열 array에서 3을 제거합니다.
    sharedDB.update({
        ...
        data : {
            $pull : {
                array : 3
            }
        }
    })
    ```
    * `$pull`
    ```javascript
    // 배열 array에서 a가 3인 데이터를 제거합니다.
    sharedDB.update({
        ...
        data : {
            $pull : {
                array : {
                    a : 3
                }
            }
        }
    })
    ```
    
* `CPU_SHARED_DB(name)` CPU들이 공유하는 데이터베이스입니다. 사용법은 `SHARED_DB`와 같습니다. *동시에 데이터가 수정되는 경우에는 각 CPU별 프로세스 간에 데이터의 싱크가 맞지 않을 수 있으므로, 이를 염두해 두고 로직을 작성하시기 바랍니다.* [예제보기](../EXAMPLES/NODE/CLUSTERING/CPU_SHARED_DB.js)

### 주의사항
클러스터링 된 CPU와 서버들 간에 데이터를 동기화 하는데 시간이 걸릴 수 있습니다. 예를들어, A 서버와 B 서버에서 각각 `sample`이라는 값을 동시에 변경하였을때 A 서버에서 제공하는 값이 될지 B 서버에서 제공하는 값이 될지 확실하지 않습니다. 주의하시기 바랍니다.

## 콘솔 로그 색상
[예제보기](../EXAMPLES/NODE/CONSOLE_COLOR/CONSOLE_COLOR.js)

* `CONSOLE_RED(text)` 콘솔에 `text`를 빨간색으로 출력합니다.
* `CONSOLE_GREEN(text)` 콘솔에 `text`를 초록색으로 출력합니다.
* `CONSOLE_BLUE(text)` 콘솔에 `text`를 파란색으로 출력합니다.
* `CONSOLE_YELLOW(text)` 콘솔에 `text`를 노란색으로 출력합니다.

## 시스템 관련 기능
* `CPU_USAGES()` 현재 CPU 사용률을 CPU 코어 개수만큼 배열로 반환합니다. [예제보기](../EXAMPLES/NODE/SYSTEM/CPU_USAGES.js)
* `MEMORY_USAGE()` 현재 메모리 사용률을 반환합니다. [예제보기](../EXAMPLES/NODE/SYSTEM/MEMORY_USAGE.js)

다음 문서: [Configuration](CONFIG.md)
