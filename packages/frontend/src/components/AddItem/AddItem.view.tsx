import React, { useState } from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { AddItem_group } from './__generated__/AddItem_group.graphql';

interface Props {
	group: AddItem_group;
}

const AddItemView: React.FC<Props> = ({ group }) => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState(0);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
			}}
		>
			<h2>Add item for {group.name}</h2>
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

export default createFragmentContainer(AddItemView, {
	group: graphql`
		fragment AddItem_group on Group {
			id
			name
		}
	`,
});
