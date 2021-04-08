const pTap = tapHandler => async value => {
	await tapHandler(value);
	return value;
};

pTap.catch = tapHandler => async error => {
	await tapHandler(error);
	throw error;
};

export default pTap;
