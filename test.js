import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import pTap from '.';

const fixture = Symbol('unicorn');
const fixtureError = new Error('unicorn');
const tapError = new Error('tap error!');

test('ignores tap value', async t => {
	const value = await Promise.resolve(fixture)
		.then(pTap(tapValue => {
			t.is(tapValue, fixture);
			return 'ignored-val';
		}));

	t.is(value, fixture);
});

test('does not ignore tap error', async t => {
	await Promise.resolve(fixture)
		.then(pTap(() => {
			throw tapError;
		}))
		.catch(error => {
			t.is(error, tapError);
		});
});

test('waits for tap promise to resolve', async t => {
	const end = timeSpan();
	const value = await Promise.resolve(fixture).then(pTap(() => delay(200)));

	t.is(value, fixture);
	t.true(end() > 180);
});

test('catch - ignores tap value', async t => {
	t.plan(2);

	await Promise.reject(fixtureError)
		.catch(pTap.catch(error => {
			t.is(error, fixtureError);
			return 'ignored-val';
		}))
		.catch(error => {
			t.is(error, fixtureError);
		});
});

test('catch - does not ignore tap error', async t => {
	t.plan(1);

	await Promise.reject(fixtureError)
		.catch(pTap.catch(() => {
			throw tapError;
		}))
		.catch(error => {
			t.is(error, tapError);
		});
});

test('catch - waits for tap promise to resolve', async t => {
	const end = timeSpan();

	await Promise.reject(fixtureError)
		.catch(pTap.catch(() => delay(200)))
		.catch(error => {
			t.is(error, fixtureError);
			t.true(end() > 180);
		});
});
