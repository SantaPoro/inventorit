import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import { ItemList } from '../ItemList';

import { Group_group } from './__generated__/Group_group.graphql';

interface Props {
	group: Group_group;
}

const GroupView: React.FC<Props> = ({ group }) => {
	return (
		<React.Fragment>
			<div>{group.name}</div>
			<Link to={`/groups/${group.id}/create-item`}>Create item</Link>
			<ItemList items={group.items} />
		</React.Fragment>
	);
};

export default createFragmentContainer(GroupView, {
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
