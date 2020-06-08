export function toGlobalId(type: string, id: string) {
	if (type.length === 0) {
		throw new Error('"type" must not be empty');
	}

	if (id.length === 0) {
		throw new Error('"id" my not be empty');
	}

	return Buffer.from(type + ':' + id).toString('base64');
}

export function fromGlobalId(globalId: string) {
	const [type, id] = Buffer.from(globalId, 'base64').toString('utf8').split(':');
	if (id === undefined) {
		throw new Error('Invalid global id');
	}

	return { type, id };
}
