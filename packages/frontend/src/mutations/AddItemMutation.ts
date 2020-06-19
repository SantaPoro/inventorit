import { commitMutation, graphql } from 'react-relay';
import { MutationConfig } from 'relay-runtime';

import relayEnvironment from '../relay-environment';

import { AddItemMutation } from './__generated__/AddItemMutation.graphql';

const mutation = graphql`
	mutation AddItemMutation($input: CreateItemInput!) {
		createItem(input: $input) {
			itemEdge {
				node {
					id
					name
				}
			}
		}
	}
`;

interface AddItemArgs {
	variables: MutationConfig<AddItemMutation>['variables'];
	onCompleted?: MutationConfig<AddItemMutation>['onCompleted'] | null;
	onError?: MutationConfig<AddItemMutation>['onError'] | null;
}

export const addItem = ({ variables, onCompleted, onError }: AddItemArgs) => {
	return commitMutation<AddItemMutation>(relayEnvironment, {
		mutation,
		variables,
		onCompleted,
		onError,
	});
};
