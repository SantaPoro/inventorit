import React, { useState } from 'react';

import { useRouter } from 'found';
import { commitMutation, createFragmentContainer, graphql } from 'react-relay';

import { CreateItem_group } from './__generated__/CreateItem_group.graphql';
import { CreateItemMutation } from './__generated__/CreateItemMutation.graphql';
import relayEnvironment from './relay-environment';

const mutation = graphql`
	mutation CreateItemMutation($input: CreateItemInput!) {
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

interface Props {
	group: CreateItem_group;
}

const CreateItem: React.FC<Props> = ({ group }) => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState(0);
	const { router } = useRouter();

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				return commitMutation<CreateItemMutation>(relayEnvironment, {
					mutation,
					variables: {
						input: {
							name,
							amount,
							group: group.id,
						},
					},
					onCompleted: () => {
						router.replace(`/groups/${group.id}`);
					},
				});
			}}
		>
			<h2>Create item for {group.name}</h2>
			<div>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
			</div>
			<div>
				<label htmlFor="amount">Amount</label>
				<input
					type="number"
					id="amount"
					name="amount"
					value={amount}
					onChange={e => setAmount(parseInt(e.target.value, 10))}
				/>
			</div>
			<div>
				<input type="submit" value="Create" />
			</div>
		</form>
	);
};

export default createFragmentContainer(CreateItem, {
	group: graphql`
		fragment CreateItem_group on Group {
			id
			name
		}
	`,
});
