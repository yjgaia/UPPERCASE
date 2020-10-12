/*
 * 웹 폰트를 사용할 수 있도록 불러옵니다.
 */
global.ADD_FONT = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.name
		//OPTIONAL: params.style
		//OPTIONAL: params.weight
		//OPTIONAL: params.woff2
		//OPTIONAL: params.woff
		//OPTIONAL: params.otf
		//OPTIONAL: params.ttf
		
		let name = params.name;
		let style = params.style;
		let weight = params.weight;
		let woff2 = params.woff2;
		let woff = params.woff;
		let otf = params.otf;
		let ttf = params.ttf;
		
		let src = '';
		if (woff2 !== undefined) {
			src += 'url(' + woff2 + ') format(\'woff2\'),';
		}
		if (woff !== undefined) {
			src += 'url(' + woff + ') format(\'woff\'),';
		}
		if (otf !== undefined) {
			src += 'url(' + otf + ') format(\'opentype\'),';
		}
		if (ttf !== undefined) {
			src += 'url(' + ttf + ') format(\'truetype\'),';
		}
		
		let content = '@font-face {';
		content += 'font-family:' + name + ';';
		
		if (style !== undefined) {
			content += 'font-style:' + style + ';';
		}
		if (weight !== undefined) {
			content += 'font-weight:' + weight + ';';
		}
		
		content += 'src:' + src.substring(0, src.length - 1) + ';';
		content += '}';
		
		// create font style element.
		let fontStyleEl = document.createElement('style');
		fontStyleEl.type = 'text/css';
		fontStyleEl.appendChild(document.createTextNode(content));
		document.getElementsByTagName('head')[0].appendChild(fontStyleEl);
	}
});
