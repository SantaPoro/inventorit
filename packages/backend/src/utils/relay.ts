import { base64, unbase64 } from './base64';

export interface Node {
	id: string;
}

interface ConnectionArguments {
	first?: number | null;
	after?: string | null;
	last?: number | null;
	before?: string | null;
}

interface Connection {
	totalCount: number;
	edges: Edge<Node>[];
	pageInfo: PageInfo;
}

interface PageInfo {
	startCursor: string;
	endCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

interface Edge<T> {
	node: T;
	cursor: string;
}

const PREFIX = 'arrayconnection:';

/**
 * Creates the cursor string from an offset.
 */
export function offsetToCursor(offset: number): string {
	return base64(PREFIX + offset);
}

/**
 * Rederives the offset from the cursor string.
 */
export function cursorToOffset(cursor: string): number {
	const offset = parseInt(unbase64(cursor).substring(PREFIX.length), 10);
	if (isNaN(offset)) {
		throw new Error('Could not convert cursor to offset');
	}

	return offset;
}

export function connectionFromArray(allNodes: Node[], { first, after, last, before }: ConnectionArguments): Connection {
	// const edges = edgesToReturn(arraySlice, args);
	let hasNextPage = false;
	let hasPreviousPage = false;
	let start = 0;
	let end = allNodes.length;
	if (first !== undefined && first !== null) {
		if (first < 0) {
			throw new Error('Argument "first" must be a non-negative integer');
		}

		if (after) {
			const afterOffset = cursorToOffset(after);

			// Meta
			hasPreviousPage = afterOffset >= 0;
			start = afterOffset + 1;
		}

		end = start + first;
		hasNextPage = start + first < allNodes.length;
	} else if (last !== undefined && last !== null) {
		if (last < 0) {
			throw new Error('Argument "last" must be a non-negative integer');
		}

		let beforeOffset = allNodes.length;
		if (before) {
			beforeOffset = cursorToOffset(before);

			// Meta
			hasNextPage = beforeOffset <= allNodes.length;
			end = beforeOffset;
		}

		start = end - last;
		hasPreviousPage = end - last > 0;
	}

	const nodes = allNodes.slice(start, end);

	if (nodes.length === 0) {
		throw new Error('No edges');
	}

	const edges = nodes.map<Edge<Node>>((node, index) => ({
		cursor: offsetToCursor(start + index),
		node,
	}));

	const firstEdge = edges[0];
	const lastEdge = edges.slice(-1)[0];
	return {
		totalCount: allNodes.length,
		edges,
		pageInfo: {
			startCursor: firstEdge.cursor,
			endCursor: lastEdge.cursor,
			hasNextPage,
			hasPreviousPage,
		},
	};
}
