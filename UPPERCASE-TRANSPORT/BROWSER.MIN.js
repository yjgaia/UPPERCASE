global.CONNECT_TO_WEB_SOCKET_SERVER=METHOD({run:function(o,n){"use strict";var e,i,t,E,d,a,_,c,s=void 0===o.isSecure?BROWSER_CONFIG.isSecure:o.isSecure,C=void 0===o.host?BROWSER_CONFIG.host:o.host,r=o.port,v={},u=0;CHECK_IS_DATA(n)!==!0?e=n:(e=n.success,i=n.error),c=function(o,n,e){var i=v[o];void 0!==i&&EACH(i,function(o){o(n,function(o){void 0!==_&&void 0!==e&&_({methodName:"__CALLBACK_"+e,data:o})})})},t=new WebSocket((s===!0?"wss://":"ws://")+C+":"+r),t.onopen=function(){E=!0,e(d=function(o,n){var e=v[o];void 0===e&&(e=v[o]=[]),e.push(n)},a=function(o,n){var e=v[o];void 0!==e&&(void 0!==n?REMOVE({array:e,value:n}):delete v[o])},_=function(o,n){var e,i,E;CHECK_IS_DATA(o)!==!0?e=o:(e=o.methodName,i=o.data),void 0!==t&&(t.send(STRINGIFY({methodName:e,data:i,sendKey:u})),void 0!==n&&(E="__CALLBACK_"+u,d(E,function(o){n(o),a(E)})),u+=1)},function(){void 0!==t&&(t.close(),t=void 0)})},t.onmessage=function(o){var n=PARSE_STR(o.data);void 0!==n&&c(n.methodName,n.data,n.sendKey)},t.onclose=function(){c("__DISCONNECTED")},t.onerror=function(o){var n=o.toString();E!==!0?void 0!==i?i(n):console.log("[UPPERCASE-CONNECT_TO_WEB_SOCKET_SERVER] CONNECT TO WEB SOCKET SERVER FAILED: "+n):c("__ERROR",n)}}});