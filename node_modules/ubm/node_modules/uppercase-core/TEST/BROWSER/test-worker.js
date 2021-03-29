importScripts('UPPERCASE-CORE/WORKER_HELPER.js');

let roles = [];

console.log('BOOTED!');

on('message', (data, ret) => {

	console.log('WORKER!', data);

	ret('Thanks!');
});

send({
	methodName : 'message',
	data : {
		msg : 'message from worker.'
	}
}, (retMsg) => {

	console.log('RETURN MESSAGE:', retMsg);
});

on('login', (data) => {
	if (data.username === 'test' && data.password === '1234') {
		roles.push('USER');
	}
});

on('checkRole', (role) => {

	if (CHECK_IS_IN({
		array : roles,
		value : role
	}) === true) {

		console.log('SINGED!', role);
	}
});