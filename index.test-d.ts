import {expectType} from 'tsd-check';
import pTap from '.';

Promise.resolve('unicorn')
	.then(
		pTap<string>(value => {
			expectType<string>(value);
			return 1;
		})
	)
	.then(value => {
		expectType<string>(value);
	});

Promise.reject(new Error()).catch(
	pTap.catch<Error>(error => {
		expectType<Error>(error);
	})
);
