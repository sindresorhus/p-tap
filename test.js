import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import m from './';

const fixture = Symbol('unicorn');
const fixtureErr = new Error('unicorn');

test('ignores tap value', async t => {
	const val = await Promise.resolve(fixture)
		.then(m(tapVal => {
			t.is(tapVal, fixture);
			return 'ignored-val';
		}));

	t.is(val, fixture);
});

test('ignores tap error', async t => {
	const val = await Promise.resolve(fixture)
		.then(m(() => {
			throw new Error('ignored-err');
		}));

	t.is(val, fixture);
});

test('waits for tap promise to resolve', async t => {
	const end = timeSpan();
	const val = await Promise.resolve(fixture).then(m(() => delay(200)));

	t.is(val, fixture);
	t.true(end() > 180);
});

test('catch - ignores tap value', async t => {
	t.plan(2);

	await Promise.reject(fixtureErr)
		.catch(m.catch(err => {
			t.is(err, fixtureErr);
			return 'ignored-val';
		}))
		.catch(err => {
			t.is(err, fixtureErr);
		});
});

test('catch - ignores tap error', async t => {
	t.plan(1);

	await Promise.reject(fixtureErr)
		.catch(m.catch(() => {
			throw new Error('ignored-err');
		}))
		.catch(err => {
			t.is(err, fixtureErr);
		});
});

test('catch - waits for tap promise to resolve', async t => {
	const end = timeSpan();

	await Promise.reject(fixtureErr)
		.catch(m.catch(() => delay(200)))
		.catch(err => {
			t.is(err, fixtureErr);
			t.true(end() > 180);
		});
});
