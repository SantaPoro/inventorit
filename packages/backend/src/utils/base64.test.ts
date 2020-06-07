import { base64, unbase64 } from './base64';

test('encoding / decoding is reversable', () => {
	const value = 'mystringtobeencoded';
	const encodedValue = base64(value);
	const decodedValue = unbase64(encodedValue);
	expect(decodedValue).toBe(value);
	expect(decodedValue).not.toBe(encodedValue);
});
