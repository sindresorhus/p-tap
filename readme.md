# p-tap [![Build Status](https://travis-ci.org/sindresorhus/p-tap.svg?branch=master)](https://travis-ci.org/sindresorhus/p-tap)

> Tap into a promise chain without affecting its value or state


## Install

```
$ npm install p-tap
```


## Usage

```js
const pTap = require('p-tap');

Promise.resolve('unicorn')
	.then(pTap(console.log)) // Logs `unicorn`
	.then(value => {
		// `value` is still `unicorn`
	});
```

```js
const pTap = require('p-tap');

getUser()
	.then(pTap(user => recordStatsAsync(user))) // Stats are saved about `user` async before the chain continues
	.then(user => {
		// `user` is the user from getUser(), not recordStatsAsync()
	});
```

```js
const pTap = require('p-tap');

Promise.resolve(() => doSomething())
	.catch(pTap.catch(console.error)) // prints any errors
	.then(handleSuccess)
	.catch(handleError);
```


## API

### pTap(tapHandler)

Use this in a `.then()` method.

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

### pTap.catch(tapHandler)

Use this in a `.catch()` method.

Returns a [thunk](https://en.wikipedia.org/wiki/Thunk) that returns a `Promise`.

#### tapHandler

Type: `Function`

Any return value is ignored. Exceptions thrown in `tapHandler` are relayed back to the original promise chain.

If `tapHandler` returns a `Promise`, it will be awaited before passing through the original value.


## Related

- [p-log](https://github.com/sindresorhus/p-log) - Log the value/error of a promise
- [p-if](https://github.com/sindresorhus/p-if) - Conditional promise chains
- [p-catch-if](https://github.com/sindresorhus/p-catch-if) - Conditional promise catch handler
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
