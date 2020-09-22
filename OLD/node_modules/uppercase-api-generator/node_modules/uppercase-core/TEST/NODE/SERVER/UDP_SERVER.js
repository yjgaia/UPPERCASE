TEST('UDP_SERVER', (check) => {

	let server = UDP_SERVER(8126, (requestInfo, content, response) => {
		console.log('IP: ' + requestInfo.ip + ', Port: ' + requestInfo.port + ', Content: ' + content);
	});
	
	server.send({
		ip : 'localhost',
		port : 8126,
		content : 'Hello!'
	});
});
