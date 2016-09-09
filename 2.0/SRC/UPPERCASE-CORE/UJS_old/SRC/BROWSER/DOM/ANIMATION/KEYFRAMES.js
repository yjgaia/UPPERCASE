/**
 * Animation keyframes class
 */
global.KEYFRAMES = CLASS({

	init : function(inner, self, keyframes) {
		'use strict';
		//REQUIRED: keyframes

		var
		// name
		name = '__KEYFRAMES_' + self.id,

		// str
		str = '',

		// style el
		styleEl,

		// rules string
		rulesStr = '',

		// start style
		startStyle,

		// final style
		finalStyle,

		// get name.
		getName,

		// get start style.
		getStartStyle,

		// get final style.
		getFinalStyle;

		EACH(keyframes, function(style, key) {

			str += key + '{';

			EACH(style, function(value, name) {

				if ( typeof value === 'number' && name !== 'zIndex' && name !== 'opacity') {
					value = value + 'px';
				}

				str += name.replace(/([A-Z])/g, '-$1').toLowerCase() + ':' + value + ';';

				// cross browser transform
				if (name === 'transform') {
					str += '-webkit-transform:' + value + ';';
					str += '-moz-transform:' + value + ';';
					str += '-o-transform:' + value + ';';
					str += '-ms-transform:' + value + ';';
				}
			});

			str += '}';

			if (key === 'from' || key === '0%') {
				startStyle = style;
			} else if (key === 'to' || key === '100%') {
				finalStyle = style;
			}
		});

		// cross browser @keyframes
		rulesStr += '@-webkit-keyframes ' + name + '{' + str + '}';
		rulesStr += '@-moz-keyframes ' + name + '{' + str + '}';
		rulesStr += '@-o-keyframes ' + name + '{' + str + '}';
		rulesStr += '@-ms-keyframes ' + name + '{' + str + '}';
		rulesStr += '@keyframes ' + name + '{' + str + '}';

		// create style element.
		styleEl = document.createElement('style');
		styleEl.type = 'text/css';
		styleEl.appendChild(document.createTextNode(rulesStr));
		document.getElementsByTagName('head')[0].appendChild(styleEl);

		self.getName = getName = function() {
			return name;
		};

		self.getStartStyle = getStartStyle = function() {
			return startStyle;
		};

		self.getFinalStyle = getFinalStyle = function() {
			return finalStyle;
		};
	}
});
