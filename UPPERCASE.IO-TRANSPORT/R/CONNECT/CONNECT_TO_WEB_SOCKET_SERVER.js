OVERRIDE(CONNECT_TO_WEB_SOCKET_SERVER,function(){"use strict";global.CONNECT_TO_WEB_SOCKET_SERVER=CONNECT_TO_WEB_SOCKET_SERVER=METHOD(function(e){var o,n,t,i=1e3,E=7,c=0,r=0,d={},s={};return e.request=o=function(e,o){var n=s[e],t=n.contentPieces,i="http://"+n.host+":"+n.port+"/"+n.uri+(void 0===n.clientId?"?":"?clientId="+n.clientId+"&")+"connectionKey="+n.connectionKey+"&requestKey="+e;void 0!==n.script&&n.script.remove(),0===t.length?i+="&isEnd=true":(i+="&content="+encodeURIComponent(t[0]),REMOVE({array:t,key:0})),n.script=LOAD({path:i,isNoCache:!0});try{n.script.getEl().onerror=o}catch(E){}},e.removeRequestInfo=n=function(e){var o=s[e];o.script.remove(),delete o.script,delete s[e]},e.response=t=function(e){var o=PARSE_STR(decodeURIComponent(e));d[o.connectionKey](o.clientId,o.params),n(o.requestKey)},{run:function(e,n){var t,C,u,v,_,a,O,T,N=void 0===e.host?global.location.hostname:e.host,R=e.port,f=e.fixRequestURI,I=c,S={},l=0,p=function(e,n,t){var E,c;if(s[r]={host:N,port:R,uri:f,clientId:e,connectionKey:n,contentPieces:c=[]},void 0!==t)for(E=STRINGIFY(t);""!==E;)c.push(E.substring(0,i)),E=E.substring(i);o(r,function(){K("__DISCONNECTED")}),r+=1},K=function(e,o,n){var t;_!==!0&&(t=S[e],void 0!==t&&EACH(t,function(e){e(o,function(e){void 0!==T&&void 0!==n&&T({methodName:"__CALLBACK_"+n,data:e})})}),"__DISCONNECTED"===e&&(void 0!==v&&v.remove(),_=!0))};CHECK_IS_DATA(n)!==!0?t=n:(t=n.success,C=n.error),u=DELAY(5,function(){void 0!==C?C("CONNECT TO WEB SOCKET FIX SERVER FAILED."):console.log("[UPPERCASE.IO-CONNECT_TO_WEB_SOCKET_SERVER (FIX)] CONNECT TO WEB SOCKET FIX SERVER FAILED.")}),d[I]=function(e,o){void 0!==u?(u.remove(),u=void 0,t(a=function(e,o){var n=S[e];void 0===n&&(n=S[e]=[]),n.push(o)},O=function(e,o){var n=S[e];void 0!==n&&(void 0!==o?REMOVE({array:n,value:o}):delete S[e])},T=function(o,n){var t="__CALLBACK_"+l;o.sendKey=l,l+=1,p(e,I,o),void 0!==n&&a(t,function(e){n(e),O(t)})},function(){p(e,I,{methodName:"__DISCONNECTED"}),_=!0})):void 0!==o&&K(o.methodName,o.data,o.sendKey),void 0!==v&&v.remove(),_!==!0&&(v=DELAY(E,function(){K("__DISCONNECTED")}),p(e,I))},p(void 0,I),c+=1}}})});