import gql from 'graphql-tag';

export function createConnectionTypes(name: string) {
	return gql`
		type ${name}Connection {
			totalCount: Int!
			pageInfo: PageInfo!
			edges: [${name}Edge!]!
		}

		type ${name}Edge {
			node: ${name}!
			cursor: String!
		}
	`;
}
