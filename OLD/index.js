require('uppercase-model');
require('./DIST/NODE.js');

module.exports = (value) => {
	return String(value).toUpperCase();
};
