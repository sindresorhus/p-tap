/* eslint-disable @typescript-eslint/no-floating-promises */
import {expectType} from 'tsd';
import pTap from './index.js';

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

Promise.reject(new Error('fixture')).catch(
	pTap.catch<Error>(error => {
		expectType<Error>(error);
	})
);

Promise.resolve('unicorn')
	.then(
		pTap(value => {
			expectType<string>(value);
			return 1;
		})
	);
