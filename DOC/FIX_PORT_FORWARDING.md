```javascript
OVERRIDE(CONNECT_TO_IO_SERVER, function(origin) {
	global.CONNECT_TO_IO_SERVER = METHOD({
		run : function(connectionListenerOrListeners) {
			origin({
				webServerPort : 9002
			}, connectionListenerOrListeners);
		}
	});
}); 
```