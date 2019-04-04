'use strict';

const pTap = tapHandler => async value => {
	await tapHandler(value);
	return value;
};

module.exports = pTap;
// TODO: Remove this for the next major release
module.exports.default = pTap;

module.exports.catch = tapHandler => async error => {
	await tapHandler(error);
	throw error;
};
