/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type routes_App_QueryVariables = {};
export type routes_App_QueryResponse = {
	readonly viewer: {
		readonly ' $fragmentRefs': FragmentRefs<'App_viewer'>;
	};
};
export type routes_App_Query = {
	readonly response: routes_App_QueryResponse;
	readonly variables: routes_App_QueryVariables;
};

/*
query routes_App_Query {
  viewer {
    ...App_viewer
  }
}

fragment App_viewer on Viewer {
  ...Navbar_viewer
}

fragment Navbar_viewer on Viewer {
  isLoggedIn
}
*/

const node: ConcreteRequest = {
	fragment: {
		argumentDefinitions: [],
		kind: 'Fragment',
		metadata: null,
		name: 'routes_App_Query',
		selections: [
			{
				alias: null,
				args: null,
				concreteType: 'Viewer',
				kind: 'LinkedField',
				name: 'viewer',
				plural: false,
				selections: [
					{
						args: null,
						kind: 'FragmentSpread',
						name: 'App_viewer',
					},
				],
				storageKey: null,
			},
		],
		type: 'Query',
	},
	kind: 'Request',
	operation: {
		argumentDefinitions: [],
		kind: 'Operation',
		name: 'routes_App_Query',
		selections: [
			{
				alias: null,
				args: null,
				concreteType: 'Viewer',
				kind: 'LinkedField',
				name: 'viewer',
				plural: false,
				selections: [
					{
						alias: null,
						args: null,
						kind: 'ScalarField',
						name: 'isLoggedIn',
						storageKey: null,
					},
				],
				storageKey: null,
			},
		],
	},
	params: {
		id: null,
		metadata: {},
		name: 'routes_App_Query',
		operationKind: 'query',
		text:
			'query routes_App_Query {\n  viewer {\n    ...App_viewer\n  }\n}\n\nfragment App_viewer on Viewer {\n  ...Navbar_viewer\n}\n\nfragment Navbar_viewer on Viewer {\n  isLoggedIn\n}\n',
	},
};
(node as any).hash = '0cbf88fe703c3b585c8f6215d6850996';
export default node;
