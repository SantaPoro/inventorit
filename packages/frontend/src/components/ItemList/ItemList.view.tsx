import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { ItemCard } from '../ItemCard';

import { ItemList_items } from './__generated__/ItemList_items.graphql';

interface Props {
	items: ItemList_items;
}

const ItemListView: React.FC<Props> = ({ items }) => {
	return (
		<React.Fragment>
			<h2>Items</h2>
			{items.edges.map(edge => (
				<ItemCard key={edge.node.id} item={edge.node} />
			))}
		</React.Fragment>
	);
};

export default createFragmentContainer(ItemListView, {
	items: graphql`
		fragment ItemList_items on ItemConnection {
			edges {
				node {
					id
					...ItemCard_item
				}
			}
		}
	`,
});
