declare const pTap: {
	/**
	 * Tap into a promise chain without affecting its value or state. Use this in a `.then()` method.
	 *
	 * @param tapHandler - Any return value is ignored. Exceptions thrown in `tapHandler` are relayed back to the original promise chain. If `tapHandler` returns a `Promise`, it will be awaited before passing through the original value.
	 * @returns A [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.
	 */
	<ValueType = unknown>(tapHandler: (value: ValueType) => unknown): (
		value: ValueType
	) => Promise<ValueType>;

	/**
	 * Tap into a promise chain without affecting its value or state. Use this in a `.catch()` method.
	 *
	 * @param tapHandler - Any return value is ignored. Exceptions thrown in `tapHandler` are relayed back to the original promise chain. If `tapHandler` returns a `Promise`, it will be awaited before passing through the original value.
	 * @returns A [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.
	 */
	catch<ErrorType = unknown>(
		tapHandler: (error: ErrorType) => unknown
	): (error: ErrorType) => Promise<never>;
}

export default pTap;
