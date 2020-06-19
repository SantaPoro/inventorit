import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { ItemCard_item } from './__generated__/ItemCard_item.graphql';

interface Props {
	item: ItemCard_item;
}

const ItemCardView: React.FC<Props> = ({ item }) => {
	return <div>{item.name}</div>;
};

export default createFragmentContainer(ItemCardView, {
	item: graphql`
		fragment ItemCard_item on Item {
			id
			name
		}
	`,
});
