TEST('MINIFY_JS', (check) => {

	READ_FILE('UPPERCASE-CORE/NODE/MINIFY/sample.js', (content) => {

		let jsCode = content.toString();

		console.log(MINIFY_JS(jsCode));
	});
});
