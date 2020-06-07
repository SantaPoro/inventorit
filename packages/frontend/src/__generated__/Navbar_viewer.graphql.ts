/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type Navbar_viewer = {
	readonly isLoggedIn: boolean;
	readonly ' $refType': 'Navbar_viewer';
};
export type Navbar_viewer$data = Navbar_viewer;
export type Navbar_viewer$key = {
	readonly ' $data'?: Navbar_viewer$data;
	readonly ' $fragmentRefs': FragmentRefs<'Navbar_viewer'>;
};

const node: ReaderFragment = {
	argumentDefinitions: [],
	kind: 'Fragment',
	metadata: null,
	name: 'Navbar_viewer',
	selections: [
		{
			alias: null,
			args: null,
			kind: 'ScalarField',
			name: 'isLoggedIn',
			storageKey: null,
		},
	],
	type: 'Viewer',
};
(node as any).hash = '16761d26425152d24733c4f19cf5539f';
export default node;
