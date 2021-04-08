declare const pTap: {
	/**
	Tap into a promise chain without affecting its value or state. Use this in a `.then()` method.

	@param tapHandler - Any return value is ignored. Exceptions thrown in `tapHandler` are relayed back to the original promise chain. If `tapHandler` returns a `Promise`, it will be awaited before passing through the original value.
	@returns A [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

	@example
	```
	import pTap from 'p-tap';

	Promise.resolve('unicorn')
		.then(pTap(console.log)) // Logs `unicorn`
		.then(value => {
			// `value` is still `unicorn`
		});

	getUser()
		.then(pTap(user => recordStatsAsync(user))) // Stats are saved about `user` async before the chain continues
		.then(user => {
			// `user` is the user from getUser(), not recordStatsAsync()
		});
	```
	*/
	<ValueType>(tapHandler: (value: ValueType) => unknown): (
		value: ValueType
	) => Promise<ValueType>;

	/**
	Tap into a promise chain without affecting its value or state. Use this in a `.catch()` method.

	@param tapHandler - Any return value is ignored. Exceptions thrown in `tapHandler` are relayed back to the original promise chain. If `tapHandler` returns a `Promise`, it will be awaited before passing through the original value.
	@returns A [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

	@example
	```
	import pTap from 'p-tap';

	Promise.resolve(() => doSomething())
		.catch(pTap.catch(console.error)) // Prints any errors
		.then(handleSuccess)
		.catch(handleError);
	```
	*/
	catch<ErrorType>(
		tapHandler: (error: ErrorType) => unknown
	): (error: ErrorType) => Promise<never>;
};

export default pTap;
