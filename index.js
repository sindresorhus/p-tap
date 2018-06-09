'use strict';

module.exports = fn => value => {
	const ret = () => value;
	return Promise.resolve(value).then(fn).then(ret);
};

module.exports.catch = fn => error => {
	const ret = () => Promise.reject(error);
	return Promise.resolve(error).then(fn).then(ret);
};
