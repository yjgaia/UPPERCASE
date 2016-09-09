# 클러스터링 지원하기
`UJS-NODE`에는 클러스터링을 지원하는 여러가지 기능들이 있습니다.

## CPU 클러스터링
기본적으로 Node.js 환경은 멀티코어 CPU를 지원하지 않습니다.
UJS에서는 `CPU_CLUSTERING`를 통해 멀티코어 CPU 각각에 프로세스를 실행시키는 방법으로 멀티코어 CPU를 지원하고 있습니다.

```javascript
CPU_CLUSTERING(function() {

	console.log('WORK, WORKER!: ', CPU_CLUSTERING.getWorkerId());

	CPU_CLUSTERING.on('receive', function(data) {
		ok(CHECK_ARE_SAME([data, {
			msg : 'Hey!'
		}]));
	});

	if (CPU_CLUSTERING.getWorkerId() === 1) {

		CPU_CLUSTERING.broadcast({
			methodName : 'receive',
			data : {
				msg : 'Hey!'
			}
		});
	}
});
```

## 서버 간 클러스터링
CPU간 클러스터링을 넘어, 다른 하드웨어(서버) 간 클러스터링이 가능합니다.
이하는 두 서버 간 클러스터링을 하는 예제입니다.

```javascript
SERVER_CLUSTERING({
	hosts : {
		serverA : '12.34.56.78',
		serverB : '12.34.56.89'
	},
	thisServerName : 'serverA',
	port : 8125
}, function() {

	SERVER_CLUSTERING.on('receive', function(data) {
		ok(CHECK_ARE_SAME([data, {
			msg : 'Hey!'
		}]));
	});

	DELAY(1, function() {

		SERVER_CLUSTERING.broadcast({
			methodName : 'receive',
			data : {
				msg : 'Hey!'
			}
		});
	});
});
```

## 프로세스 간 데이터 공유
각 프로세스들은 고유한 메모리 영역을 가지므로, 메모리를 공유하지 않습니다.
UJS에는 프로세스 간 데이터를 공유하기 위한 기능들이 있습니다.
간단한 값을 저장하기 위해서는 `SHARED_STORE`를, 데이터를 저장하기 위해서는 `SHARED_DB`를 사용합니다.

```javascript
var
// shared store
sharedStore = SHARED_STORE('sharedStore'),

// shared db
sharedDB = SHARED_STORE('sharedDB');

sharedStore.save({
	name : 'msg',
	value : 'Hello World!'
});

sharedDB.save({
	id : '1234',
	data : {
		msg : 'Hello World!',
		age : 12
	}
});
```

`SHARED_DB`로 만들어진 저장소에서 데이터를 수정 할 때에는 `$inc`, `$push`, `$addToSet`, `$pull`등 [MongoDB](http://www.mongodb.org)에서 사용되는 Operator를 사용할 수 있습니다. 이를 통해 모든 프로세스의 데이터 일관성을 유지할 수 있습니다.
*그러나 동시에 데이터가 수정되는 경우에는 서버 간 데이터의 싱크가 맞지 않을 수 있으므로, 이를 염두해 두고 로직을 작성하시기 바랍니다.*

```javascript
sharedDB.update({
	id : '1234',
	data : {
		$inc : {
			age : 1
		}
	}
});
```