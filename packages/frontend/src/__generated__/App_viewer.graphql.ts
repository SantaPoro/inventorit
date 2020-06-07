/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type App_viewer = {
	readonly ' $fragmentRefs': FragmentRefs<'Navbar_viewer'>;
	readonly ' $refType': 'App_viewer';
};
export type App_viewer$data = App_viewer;
export type App_viewer$key = {
	readonly ' $data'?: App_viewer$data;
	readonly ' $fragmentRefs': FragmentRefs<'App_viewer'>;
};

const node: ReaderFragment = {
	argumentDefinitions: [],
	kind: 'Fragment',
	metadata: null,
	name: 'App_viewer',
	selections: [
		{
			args: null,
			kind: 'FragmentSpread',
			name: 'Navbar_viewer',
		},
	],
	type: 'Viewer',
};
(node as any).hash = '072c9f7dd99cb31703876f7c9d9d40b7';
export default node;
