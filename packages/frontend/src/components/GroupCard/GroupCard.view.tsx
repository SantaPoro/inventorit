import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import { GroupCard_group } from '../__generated__/GroupCard_group.graphql';

interface Props {
	group: GroupCard_group;
}

const GroupCardView: React.FC<Props> = ({ group }) => {
	return (
		<div>
			{group.name}
			<Link to={`/groups/${group.id}`}>See moar</Link>
		</div>
	);
};

export default createFragmentContainer(GroupCardView, {
	group: graphql`
		fragment GroupCard_group on Group {
			id
			name
		}
	`,
});
