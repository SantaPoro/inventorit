export function base64(input: string) {
	return Buffer.from(input).toString('base64');
}

export function unbase64(input: string) {
	return Buffer.from(input, 'base64').toString('utf8');
}
