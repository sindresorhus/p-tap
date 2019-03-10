'use strict';

const pTap = tapHandler => async value => {
	await tapHandler(value);
	return value;
};

module.exports = pTap;
module.exports.default = pTap;

module.exports.catch = tapHandler => async error => {
	await tapHandler(error);
	throw error;
};
