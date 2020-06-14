import { connectionFromArray, cursorToOffset, offsetToCursor } from './relay';

const nodes = [{ id: '0' }, { id: '1' }, { id: '2' }, { id: '3' }];

test('offset cursor retains value throughout encode / decode', () => {
	const offsets = [-17, -1, 0, 3, 31];
	const cursors = offsets.map(offset => offsetToCursor(offset));
	expect(cursors).not.toEqual(offsets);
	expect(cursors.map(cursor => cursorToOffset(cursor))).toEqual(offsets);
});

test('decoding cursor fails on invalid cursor', () => {
	const cursor = 'abc';
	expect(() => cursorToOffset(cursor)).toThrow();
});

test('first is negative', () => {
	expect(() =>
		connectionFromArray(nodes, {
			first: -1,
		}),
	).toThrow();
});

test('last is negative', () => {
	expect(() =>
		connectionFromArray(nodes, {
			first: -1,
		}),
	).toThrow();
});

test('no pagination args are given', () => {
	const connection = connectionFromArray(nodes, {});
	expect(connection.edges.length).toBe(4);
	expect(cursorToOffset(connection.pageInfo.startCursor)).toBe(0);
	expect(cursorToOffset(connection.pageInfo.endCursor)).toBe(3);
	expect(connection.pageInfo.hasNextPage).toBeFalsy();
	expect(connection.pageInfo.hasPreviousPage).toBeFalsy();
});

test('on array length of 4, first 2', () => {
	const connection = connectionFromArray(nodes, {
		first: 2,
	});
	expect(connection.edges.length).toBe(2);
	expect(cursorToOffset(connection.pageInfo.startCursor)).toBe(0);
	expect(cursorToOffset(connection.pageInfo.endCursor)).toBe(1);
	expect(connection.pageInfo.hasNextPage).toBeTruthy();
	expect(connection.pageInfo.hasPreviousPage).toBeFalsy();
});

test('on array length of 4, last 2', () => {
	const connection = connectionFromArray(nodes, {
		last: 2,
	});
	expect(connection.edges.length).toBe(2);
	expect(cursorToOffset(connection.pageInfo.startCursor)).toBe(2);
	expect(cursorToOffset(connection.pageInfo.endCursor)).toBe(3);
	expect(connection.pageInfo.hasNextPage).toBeFalsy();
	expect(connection.pageInfo.hasPreviousPage).toBeTruthy();
});

test('on array length of 4, first 2, after 3rd', () => {
	const connection = connectionFromArray(nodes, {
		first: 2,
		after: offsetToCursor(2),
	});
	expect(connection.edges.length).toBe(1);
	expect(cursorToOffset(connection.pageInfo.startCursor)).toBe(3);
	expect(cursorToOffset(connection.pageInfo.endCursor)).toBe(3);
	expect(connection.pageInfo.hasNextPage).toBeFalsy();
	expect(connection.pageInfo.hasPreviousPage).toBeTruthy();
});

test('on array length of 4, last 2, before 4th', () => {
	const connection = connectionFromArray(nodes, {
		last: 2,
		before: offsetToCursor(3),
	});
	expect(connection.edges.length).toBe(2);
	expect(cursorToOffset(connection.pageInfo.startCursor)).toBe(1);
	expect(cursorToOffset(connection.pageInfo.endCursor)).toBe(2);
	expect(connection.pageInfo.hasNextPage).toBeTruthy();
	expect(connection.pageInfo.hasPreviousPage).toBeTruthy();
});
