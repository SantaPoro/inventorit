import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import { Group_group } from './__generated__/Group_group.graphql';
import ItemList from './ItemList';

interface Props {
	group: Group_group;
}

const Group: React.FC<Props> = ({ group }) => {
	return (
		<React.Fragment>
			<div>{group.name}</div>
			<Link to={`/groups/${group.id}/create-item`}>Create item</Link>
			<ItemList items={group.items} />
		</React.Fragment>
	);
};

export default createFragmentContainer(Group, {
	group: graphql`
		fragment Group_group on Group {
			id
			name
			items {
				...ItemList_items
			}
		}
	`,
});
