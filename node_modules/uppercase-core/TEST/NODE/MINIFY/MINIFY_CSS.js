TEST('MINIFY_CSS', (check) => {

	READ_FILE('UPPERCASE-CORE/NODE/MINIFY/sample.css', (content) => {

		let cssCode = content.toString();

		console.log(MINIFY_CSS(cssCode));
	});
});
