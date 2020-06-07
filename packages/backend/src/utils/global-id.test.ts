import { fromGlobalId, toGlobalId } from './global-id';

test('type and id are retained across encode / decode', () => {
	const type = 'User';
	const id = 'someid123';
	const globalId = toGlobalId(type, id);
	expect(fromGlobalId(globalId)).toEqual({ type, id });
});

test('error is thrown when encoding empty type or id', () => {
	expect(() => toGlobalId('', '')).toThrow();
	expect(() => toGlobalId('type', '')).toThrow();
	expect(() => toGlobalId('', 'id')).toThrow();
	expect(() => toGlobalId('type', 'id')).not.toThrow();
});

test('error is thrown when decoding invalid global id', () => {
	expect(() => fromGlobalId('somegibberishstring')).toThrow();
});
