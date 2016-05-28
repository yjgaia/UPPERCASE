global.TO_DELETE=null,global.CONFIG={isDevMode:!1},global.METHOD=function(n){"use strict";var t,e,r=function(n,t){return void 0!==e?e(n,t):void 0};return r.type=METHOD,t="function"==typeof n?n(r):n,void 0!==t&&(e=t.run),r},global.CLASS=METHOD(function(n){"use strict";var t,e=0;return n.getInstanceId=t=function(){return e+=1,e-1},{run:function(n){var e,r,i,o,u,a,c,E=function(n,e){var r={},i={};return i.type=E,i.checkIsInstanceOf=function(n){for(var t=E;void 0!==t;){if(t===n)return!0;t=t.mom}return!1},i.id=t(),n=a(r,i,n,e),c(r,i,n,e),i};return E.type=CLASS,E.innerInit=a=function(n,t,e,u){var a,c,f,A=function(n,t){EACH(t,function(t,e){void 0===n[e]?n[e]=t:CHECK_IS_DATA(n[e])===!0&&CHECK_IS_DATA(t)===!0&&A(n[e],t)})};return void 0!==o&&(void 0===e?e=o(E):CHECK_IS_DATA(e)===!0?(c=o(E),void 0!==c&&A(e,c)):(f=e,e=o(E))),void 0!==r&&(a=r(e,u),void 0!==a&&(E.mom=a,a.type===CLASS?a.innerInit(n,t,e,u):a.type.innerInit(n,t,e,u))),void 0!==i&&i(n,t,void 0===f?e:f,u),e},e="function"==typeof n?n(E):n,void 0!==e&&(r=e.preset,i=e.init,o=e.params,u=e.afterInit),E.innerAfterInit=c=function(n,t,e,r){var i=E.mom;void 0!==i&&(i.type===CLASS?i.innerAfterInit(n,t,e,r):i.type.innerAfterInit(n,t,e,r)),void 0!==u&&u(n,t,e,r)},E}}}),global.OBJECT=METHOD(function(n){"use strict";var t,e,r,i,o=[],u=!1;return t=function(n){var t=n.type,e={},r={};n.id=CLASS.getInstanceId(),t.innerInit(e,n,r),t.innerAfterInit(e,n,r)},e=function(n){u===!0?t(n):o.push(n)},n.removeReadyObject=r=function(n){REMOVE({array:o,value:n})},n.initObjects=i=function(){EACH(o,function(n){t(n)}),u=!0},{run:function(n){var t=CLASS(n),r={};return r.type=t,r.checkIsInstanceOf=function(n){for(var e=t;void 0!==e;){if(e===n)return!0;e=e.mom}return!1},e(r),r}}}),global.INIT_OBJECTS=METHOD({run:function(){"use strict";OBJECT.initObjects()}}),global.BOX=METHOD(function(n){"use strict";var t,e={};return n.getBoxes=t=function(){return e},{run:function(n){var t=function(n){var e,r=n.split(".");return EACH(r,function(n){void 0===e?(void 0===t[n]&&(t[n]={}),e=t[n]):(void 0===e[n]&&(e[n]={}),e=e[n])}),e},r=n.split("."),i=global,o="";return t.boxName=n,t.type=BOX,e[n]=t,EACH(r,function(n,e){o+=(""===o?"":".")+n,e<r.length-1?i=void 0!==i[n]?i[n]:i[n]={}:i[n]=t}),FOR_BOX.inject(t),t}}}),global.FOR_BOX=METHOD(function(n){"use strict";var t,e=[];return n.inject=t=function(n){EACH(e,function(t){t(n)})},{run:function(n){EACH(BOX.getBoxes(),function(t){n(t)}),e.push(n)}}}),global.NEXT=METHOD({run:function(n,t){"use strict";var e,r,i;void 0===t&&(t=n,n=void 0),void 0!==n&&(CHECK_IS_ARRAY(n)!==!0?e=n:r=n),REPEAT({start:t.length-1,end:0},function(n){var o;0!==n&&void 0===i?i=t[n]():n>0?(o=i,i=t[n](o),i.next=o):(o=i,void 0===o&&(o=function(){}),i=t[n],void 0!==e?RUN(function(){var n=-1;RUN(function(t){n+=1,e>n+1?i(n,t):i(n,o)})}):void 0!==r?RUN(function(){var n=r.length,t=-1;0===n?o():RUN(function(e){t+=1,n>t+1?(r.length===n-1&&(t-=1,n-=1),i(r[t],e,t)):i(r[t],o,t)})}):i(o))})}}),global.OVERRIDE=METHOD({run:function(n,t){"use strict";void 0!==n.type&&n.type.type===CLASS&&OBJECT.removeReadyObject(n),t(n)}}),global.PARALLEL=METHOD({run:function(n,t){"use strict";var e,r=0;void 0===t?(t=n,RUN(function(){var n=t.length-1;EACH(t,function(e,i){n>i&&e(function(){r+=1,r===n&&t[n]()})})})):void 0===n?t[1]():CHECK_IS_DATA(n)===!0?(e=COUNT_PROPERTIES(n),0===e?t[1]():EACH(n,function(e,i){t[0](e,function(){r+=1,r===n&&t[1]()},i)})):CHECK_IS_ARRAY(n)!==!0?0===n.length?t[1]():EACH(n,function(e,i){t[0](e,function(){r+=1,r===n.length&&t[1]()},i)}):0===n?t[1]():REPEAT(n,function(e){t[0](e,function(){r+=1,r===n&&t[1]()})})}}),global.PARSE_STR=METHOD({run:function(n){"use strict";var t;try{return t=JSON.parse(n),CHECK_IS_DATA(t)===!0?UNPACK_DATA(t):t}catch(e){return void 0}}}),global.RANDOM_STR=METHOD({run:function(n){"use strict";var t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return REPEAT(n,function(){t+=e.charAt(RANDOM({limit:e.length}))}),t}}),global.STRINGIFY=METHOD({run:function(n){"use strict";return JSON.stringify(CHECK_IS_DATA(n)===!0?PACK_DATA(n):n)}}),global.TEST=METHOD(function(){"use strict";var n=0;return{run:function(t,e){e(function(e){var r,i={};e===!0?console.log("["+t+" TEST] SUCCESS! "+n+" error(s) founded."):(i.__THROW_ERROR_$$$=function(){try{throw Error()}catch(n){return n}},r=i.__THROW_ERROR_$$$().stack,void 0!==r&&(r=r.substring(r.indexOf("__THROW_ERROR_$$$")),r=r.split("\n")[2],r=r.substring(r.indexOf("at "))),n+=1,console.log("["+t+" TEST] ERROR! "+r+" "+n+" error(s) founded."))})}}}),global.URI_MATCHER=CLASS({init:function(n,t,e){"use strict";var r,i=CLASS({init:function(n,t,r){var i,o,u,a=r.split("/"),c={},E=function(n){var t=n.split("/");return EACH(a,function(n,e){var r=t[e];if("**"===r)return i=!0,!1;if(void 0===r)return!1;if(""!==n&&"{"===r.charAt(0)&&"}"===r.charAt(r.length-1))c[r.substring(1,r.length-1)]=n;else if("*"!==r&&r!==n)return!1;return e===a.length-1&&e<t.length-1&&""!==t[t.length-1]?!1:void 0})===!0||i===!0};i=CHECK_IS_ARRAY(e)===!0?EACH(e,function(n){return E(n)!==!0})!==!0:E(e),t.checkIsMatched=o=function(){return i},t.getURIParams=u=function(){return c}}});t.check=r=function(n){return i(n)}}}),global.VALID=CLASS(function(n){"use strict";var t,e,r,i,o,u,a,c,E,f,A,v,l,s,d,C,_,g,T,H,R;return n.notEmpty=t=function(n){var t=void 0===n||n===TO_DELETE?"":String(n);return CHECK_IS_ARRAY(n)===!0||""!==t.trim()},n.regex=e=function(n){var t=n.pattern,e=String(n.value);return e===e.match(t)[0]},n.size=r=function(n){var t=n.min,e=n.max,r=String(n.value);return void 0===t&&(t=0),t<=r.trim().length&&(void 0===e||r.length<=e)},n.integer=i=function(n){var e=String(n);return t(e)===!0&&e.match(/^(?:-?(?:0|[1-9][0-9]*))$/)!==TO_DELETE},n.real=o=function(n){var e=String(n);return t(e)===!0&&e.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/)!==TO_DELETE},n.bool=u=function(n){var t=String(n);return"true"===t||"false"===t},n.date=a=function(n){var t=String(n),e=Date.parse(t);return isNaN(e)===!1},n.min=c=function(n){var t=n.min,e=n.value;return o(e)===!0&&e>=t},n.max=E=function(n){var t=n.max,e=n.value;return o(e)===!0&&t>=e},n.email=f=function(n){return"string"==typeof n&&t(n)===!0&&n.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)!==TO_DELETE},n.png=A=function(n){return"string"==typeof n&&t(n)===!0&&n.match(/^data:image\/png;base64,/)!==TO_DELETE},n.url=v=function(n){return"string"==typeof n&&t(n)===!0&&n.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i)!==TO_DELETE&&n.length<=2083},n.username=l=function(n){return"string"==typeof n&&t(n)===!0&&n.match(/^[_a-zA-Z0-9\-]+$/)!==TO_DELETE},n.id=s=function(n){return"string"==typeof n&&t(n)===!0&&n.match(/[0-9a-f]{24}/)!==TO_DELETE&&24===n.length},n.one=d=function(n){var t=n.array,e=n.value;return EACH(t,function(n){return e===n?!1:void 0})===!1},n.array=C=function(n){return CHECK_IS_ARRAY(n)===!0},n.data=_=function(n){return CHECK_IS_DATA(n)===!0},n.element=g=function(n){var t=n.array,e=VALID({_:n.validData});return EACH(t,function(n){return e.check({_:n}).checkHasError()===!0?!1:void 0})===!0},n.property=T=function(n){var t=n.data,e=VALID({_:n.validData});return EACH(t,function(n){return e.check({_:n}).checkHasError()===!0?!1:void 0})===!0},n.detail=H=function(n){var t=n.data,e=VALID(n.validDataSet);return e.check(t).checkHasError()!==!0},n.equal=R=function(n){var t=n.value,e=String(t),r=n.validValue,i=String(r);return e===i},{init:function(e,r,i){var o,u,a,c=CLASS({init:function(e,r,o){var u,a,c=o.data,E=o.isForUpdate,f=!1,A={};EACH(i,function(e,r){e!==!0&&EACH(e,function(e,i){var o=c[r];if(E===!0&&void 0===o)return!1;if("notEmpty"!==i&&t(o)!==!0)return c[r]=E===!0?TO_DELETE:void 0,!0;if("one"===i){if(d({array:e,value:o})===!1)return f=!0,A[r]={type:i,array:e,value:o},!1}else if("element"===i){if(g({validData:e,array:o})===!1)return f=!0,A[r]={type:i,validData:e,array:o},!1}else if("property"===i){if(T({validData:e,data:o})===!1)return f=!0,A[r]={type:i,validData:e,data:o},!1}else if("detail"===i){if(H({validDataSet:e,data:o})===!1)return f=!0,A[r]={type:i,validDataSet:e,data:o},!1}else if("size"===i){if(n[i](COMBINE(CHECK_IS_DATA(e)===!0?[e,{value:o}]:[{min:e,max:e},{value:o}]))===!1)return f=!0,A[r]={type:i,validParams:e,value:o},!1}else if("regex"===i){if(n[i]({pattern:e,value:o})===!1)return f=!0,A[r]={type:i,validParam:e,value:o},!1}else if("min"===i){if(n[i]({min:e,value:o})===!1)return f=!0,A[r]={type:i,validParam:e,value:o},!1}else if("max"===i){if(n[i]({max:e,value:o})===!1)return f=!0,A[r]={type:i,validParam:e,value:o},!1}else if("equal"===i){if(n[i]({value:o,validValue:e})===!1)return f=!0,A[r]={type:i,validParam:e,value:o},!1}else if(e===!0&&n[i](o)===!1)return f=!0,A[r]={type:i,value:o},!1;t(o)===!0&&"string"==typeof o&&("integer"===i?c[r]=INTEGER(o):"real"===i?c[r]=REAL(o):"bool"===i?c[r]="true"===o:"date"===i?c[r]=new Date(o):"username"===i&&(c[r]=o.toLowerCase()))})}),EACH(c,function(n,t){void 0===i[t]&&delete c[t]}),r.checkHasError=u=function(){return f},r.getErrors=a=function(){return A}}});r.check=o=function(n){return c({data:n})},r.checkForUpdate=u=function(n){return c({data:n,isForUpdate:!0})},r.getValidDataSet=a=function(){return i}}}}),global.CHECK_IS_ARGUMENTS=METHOD({run:function(n){"use strict";return void 0!==n&&n!==TO_DELETE&&"object"==typeof n&&("[object Arguments]"===Object.prototype.toString.call(n)||void 0!==n.callee&&"function"==typeof n.callee)?!0:!1}}),global.CHECK_ARE_SAME=METHOD({run:function(n){"use strict";var t=!1,e=function(n,t){return n instanceof Date==!0&&t instanceof Date==!0?n.getTime()===t.getTime():n instanceof RegExp==!0&&t instanceof RegExp==!0?n.toString()===t.toString():CHECK_IS_DATA(n)===!0&&CHECK_IS_DATA(t)===!0?EACH(n,function(n,r){return e(n,t[r])}):CHECK_IS_ARRAY(n)===!0&&CHECK_IS_ARRAY(t)===!0?EACH(n,function(n,r){return e(n,t[r])}):n===t};return n.length>1&&(t=REPEAT(n.length,function(t){return t<n.length-1?e(n[t],n[t+1]):e(n[t],n[0])})),t}}),global.CHECK_IS_ARRAY=METHOD({run:function(n){"use strict";return void 0!==n&&n!==TO_DELETE&&"object"==typeof n&&"[object Array]"===Object.prototype.toString.call(n)?!0:!1}}),global.CHECK_IS_DATA=METHOD({run:function(n){"use strict";return void 0!==n&&n!==TO_DELETE&&CHECK_IS_ARGUMENTS(n)!==!0&&CHECK_IS_ARRAY(n)!==!0&&n instanceof Date!=!0&&n instanceof RegExp!=!0&&"object"==typeof n?!0:!1}}),global.CHECK_IS_EMPTY_DATA=METHOD({run:function(n){"use strict";return CHECK_ARE_SAME([n,{}])}}),global.COUNT_PROPERTIES=METHOD({run:function(n){"use strict";var t=0;return EACH(n,function(){t+=1}),t}}),global.PACK_DATA=METHOD({run:function(n){"use strict";var t=COPY(n),e=[],r=[];return EACH(t,function(n,i){n instanceof Date==!0?(t[i]=INTEGER(n.getTime()),e.push(i)):n instanceof RegExp==!0?(t[i]=n.toString(),r.push(i)):CHECK_IS_DATA(n)===!0?t[i]=PACK_DATA(n):CHECK_IS_ARRAY(n)===!0&&EACH(n,function(t,e){CHECK_IS_DATA(t)===!0&&(n[e]=PACK_DATA(t))})}),t.__DATE_ATTR_NAMES=e,t.__REGEX_ATTR_NAMES=r,t}}),global.UNPACK_DATA=METHOD({run:function(n){"use strict";var t=COPY(n);return void 0!==t.__DATE_ATTR_NAMES&&(EACH(t.__DATE_ATTR_NAMES,function(n){t[n]=new Date(t[n])}),delete t.__DATE_ATTR_NAMES),void 0!==t.__REGEX_ATTR_NAMES&&(EACH(t.__REGEX_ATTR_NAMES,function(n){var e,r,i=t[n];for(r=i.length-1;r>=0;r-=1)if("/"===i[r]){e=i.substring(r+1),i=i.substring(1,r);break}t[n]=new RegExp(i,e)}),delete t.__REGEX_ATTR_NAMES),EACH(t,function(n,e){CHECK_IS_DATA(n)===!0?t[e]=UNPACK_DATA(n):CHECK_IS_ARRAY(n)===!0&&EACH(n,function(t,e){CHECK_IS_DATA(t)===!0&&(n[e]=UNPACK_DATA(t))})}),t}}),global.CHECK_IS_IN=METHOD({run:function(n){"use strict";var t=n.data,e=n.array,r=n.value;return void 0!==t?EACH(t,function(n){return CHECK_ARE_SAME([n,r])===!0?!1:void 0})!==!0:void 0!==e?EACH(e,function(n){return CHECK_ARE_SAME([n,r])===!0?!1:void 0})!==!0:void 0}}),global.COMBINE=METHOD({run:function(n){"use strict";var t,e;return n.length>0&&(t=n[0],CHECK_IS_DATA(t)===!0?(e={},EACH(n,function(n){EXTEND({origin:e,extend:n})})):CHECK_IS_ARRAY(t)===!0&&(e=[],EACH(n,function(n){EXTEND({origin:e,extend:n})}))),e}}),global.COPY=METHOD({run:function(n){"use strict";var t;return CHECK_IS_DATA(n)===!0?(t={},EXTEND({origin:t,extend:n})):CHECK_IS_ARRAY(n)===!0&&(t=[],EXTEND({origin:t,extend:n})),t}}),global.EXTEND=METHOD({run:function(n){"use strict";var t=n.origin,e=n.extend;return CHECK_IS_DATA(t)===!0?EACH(e,function(n,e){var r,i,o;if(n instanceof Date==!0)t[e]=new Date(n.getTime());else if(n instanceof RegExp==!0){for(r=n.toString(),o=r.length-1;o>=0;o-=1)if("/"===r[o]){i=r.substring(o+1),r=r.substring(1,o);break}t[e]=new RegExp(r,i)}else t[e]=CHECK_IS_DATA(n)===!0||CHECK_IS_ARRAY(n)===!0?COPY(n):n}):CHECK_IS_ARRAY(t)===!0&&EACH(e,function(n){var e,r,i;if(n instanceof Date==!0)t.push(new Date(n.getTime()));else if(n instanceof RegExp==!0){for(e=n.toString(),i=e.length-1;i>=0;i-=1)if("/"===e[i]){r=e.substring(i+1),e=e.substring(1,i);break}t.push(new RegExp(e,r))}else t.push(CHECK_IS_DATA(n)===!0||CHECK_IS_ARRAY(n)===!0?COPY(n):n)}),t}}),global.FIND=METHOD({run:function(n,t){"use strict";var e,r,i,o;return void 0!==t?CHECK_IS_DATA(n)===!0?EACH(n,function(n){return t(n)===!0?(o=n,!1):void 0}):CHECK_IS_ARRAY(n)===!0&&EACH(n,function(n){return t(n)===!0?(o=n,!1):void 0}):(e=n.data,r=n.array,i=n.value,void 0!==e&&EACH(e,function(n,t){return n===i?(o=t,!1):void 0}),void 0!==r&&EACH(r,function(n,t){return n===i?(o=t,!1):void 0})),o}}),global.REMOVE=METHOD({run:function(n,t){"use strict";var e,r,i,o,u;void 0!==t?CHECK_IS_DATA(n)===!0?EACH(n,function(e,r){t(e)===!0&&REMOVE({data:n,name:r})}):CHECK_IS_ARRAY(n)===!0&&EACH(n,function(e,r){t(e)===!0&&REMOVE({array:n,key:r})}):(e=n.data,r=n.array,i=n.name,o=n.key,u=n.value,void 0!==i&&delete e[i],void 0!==o&&r.splice(o,1),void 0!==u&&(void 0!==e&&EACH(e,function(n,t){CHECK_ARE_SAME([n,u])===!0&&REMOVE({data:e,name:t})}),void 0!==r&&EACH(r,function(n,t){CHECK_ARE_SAME([n,u])===!0&&REMOVE({array:r,key:t})})))}}),global.CALENDAR=CLASS({init:function(n,t,e){"use strict";var r,i,o,u,a,c,E;void 0===e&&(e=new Date),t.getYear=r=function(){return e.getFullYear()},t.getMonth=i=function(n){var t=e.getMonth()+1;return n===!0?10>t?"0"+t:""+t:t},t.getDate=o=function(n){var t=e.getDate();return n===!0?10>t?"0"+t:""+t:t},t.getDay=u=function(){return e.getDay()},t.getHour=a=function(n){var t=e.getHours();return n===!0?10>t?"0"+t:""+t:t},t.getMinute=c=function(n){var t=e.getMinutes();return n===!0?10>t?"0"+t:""+t:t},t.getSecond=E=function(n){var t=e.getSeconds();return n===!0?10>t?"0"+t:""+t:t}}}),global.CREATE_DATE=METHOD({run:function(n){"use strict";var t=n.year,e=n.month,r=n.date,i=n.hour,o=n.minute,u=n.second,a=CALENDAR(new Date);return void 0===t&&(t=a.getYear()),void 0===e&&(e=void 0===r?0:a.getMonth()),void 0===r&&(r=void 0===i?0:a.getDate()),void 0===i&&(i=void 0===o?0:a.getHour()),void 0===o&&(o=void 0===u?0:a.getMinute()),void 0===u&&(u=0),new Date(t,e-1,r,i,o,u)}}),global.DELAY=CLASS({init:function(n,t,e,r){"use strict";var i,o,u,a,c,E,f=Date.now();void 0===r&&(r=e,e=0),o=i=1e3*e,t.resume=a=RAR(function(){void 0===u&&(u=setTimeout(function(){r(t)},o))}),t.pause=c=function(){o=i-(Date.now()-f),clearTimeout(u),u=void 0},t.remove=E=function(){c()}}}),global.INTERVAL=CLASS({init:function(n,t,e,r){"use strict";var i,o,u,a,c,E,f=Date.now();void 0===r&&(r=e,e=0),o=i=0===e?1:1e3*e,t.resume=a=RAR(function(){void 0===u&&(u=setInterval(function(){r(t)===!1&&E(),f=Date.now()},o))}),t.pause=c=function(){o=i-(Date.now()-f),clearInterval(u),u=void 0},t.remove=E=function(){c()}}}),global.LOOP=CLASS(function(){"use strict";var n,t,e=[],r=[],i=function(){void 0===t&&(n=Date.now(),t=INTERVAL(function(){var t,i,o,u,a,c=Date.now(),E=c-n;if(E>0){for(u=0;u<e.length;u+=1)if(t=e[u],void 0!==t.fps&&t.fps>0){for(void 0===t.timeSigma&&(t.timeSigma=0,t.countSigma=0),i=parseInt(t.fps/(1e3/E)*(t.timeSigma/E+1),10)-t.countSigma,void 0!==t.start&&t.start(),o=t.interval,a=0;i>a;a+=1)o(t.fps);void 0!==t.end&&t.end(E),t.countSigma+=i,t.timeSigma+=E,t.timeSigma>1e3&&(t.timeSigma=void 0)}for(u=0;u<r.length;u+=1)r[u](E);n=c}}))},o=function(){e.length<=0&&r.length<=0&&(t.remove(),t=void 0)};return{init:function(n,t,u,a){var c,E,f,A,v,l,s,d,C;void 0!==a?(CHECK_IS_DATA(a)!==!0?f=a:(E=a.start,f=a.interval,A=a.end),t.resume=l=RAR(function(){e.push(v={fps:u,start:E,interval:f,end:A}),i()}),t.pause=s=function(){REMOVE({array:e,value:v}),o()},t.changeFPS=d=function(n){v.fps=n},t.remove=C=function(){s()}):(t.resume=l=RAR(function(){r.push(c=u),i()}),t.pause=s=function(){REMOVE({array:r,value:c}),o()},t.remove=C=function(){s()})}}}),global.RAR=METHOD({run:function(n,t){"use strict";return void 0===t&&(t=n,n=void 0),t(n),t}}),global.RUN=METHOD({run:function(n){"use strict";var t=function(){return n(t)};return t()}}),global.INTEGER=METHOD({run:function(n){"use strict";return void 0===n?void 0:parseInt(n,10)}}),global.RANDOM=METHOD({run:function(n){"use strict";var t,e,r;return CHECK_IS_DATA(n)!==!0?r=n:(t=n.min,e=n.max,r=n.limit),void 0===t&&(t=0),void 0!==r&&(e=r-1),Math.floor(Math.random()*(e-t+1)+t)}}),global.REAL=METHOD({run:function(n){"use strict";return void 0===n?void 0:parseFloat(n)}}),global.EACH=METHOD({run:function(n,t){"use strict";var e,r,i;if(void 0===n)return!1;if(CHECK_IS_DATA(n)===!0){for(r in n)if((void 0===n.hasOwnProperty||n.hasOwnProperty(r)===!0)&&t(n[r],r)===!1)return!1}else{if(void 0===t)return t=n,n=void 0,function(n){return EACH(n,t)};for(e=n.length,i=0;e>i;i+=1){if(t(n[i],i)===!1)return!1;n.length<e?(i-=e-n.length,e-=e-n.length):n.length>e&&(e+=n.length-e)}}return!0}}),global.REPEAT=METHOD({run:function(n,t){"use strict";var e,r,i,o,u,a;if(void 0===t&&(t=n,n=void 0),void 0!==n&&(CHECK_IS_DATA(n)!==!0?e=n:(r=n.start,i=n.end,o=n.limit,u=n.step)),void 0===o&&void 0!==i&&(o=i+1),void 0===u&&(u=1),void 0!==e){for(a=0;a<parseInt(e,10);a+=1)if(t(a)===!1)return!1}else if(void 0!==i&&r>i){for(a=r;a>=i;a-=u)if(t(a)===!1)return!1}else{if(void 0===o)return function(n){return REPEAT(n,t)};for(a=r;o>a;a+=u)if(t(a)===!1)return!1}return!0}}),global.REVERSE_EACH=METHOD({run:function(n,t){"use strict";var e,r;if(void 0===n)return!1;if(void 0===t)return t=n,n=void 0,function(n){return REVERSE_EACH(n,t)};for(e=n.length,r=e-1;r>=0;r-=1){if(t(n[r],r)===!1)return!1;n.length<e&&(r+=e-n.length)}return!0}});