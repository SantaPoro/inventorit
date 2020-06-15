import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { ItemList_items } from './__generated__/ItemList_items.graphql';

interface Props {
	items: ItemList_items;
}

const GroupList: React.FC<Props> = ({ items }) => {
	return (
		<ul>
			{items.edges.map(edge => (
				<li key={edge.node.id}>
					{edge.node.name}: {edge.node.amount}
				</li>
			))}
		</ul>
	);
};

export default createFragmentContainer(GroupList, {
	items: graphql`
		fragment ItemList_items on ItemConnection {
			edges {
				node {
					id
					name
					amount
				}
			}
		}
	`,
});
