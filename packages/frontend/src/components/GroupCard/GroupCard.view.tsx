import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { GroupCard_group } from '../__generated__/GroupCard_group.graphql';

interface Props {
	group: GroupCard_group;
}

const GroupCardView: React.FC<Props> = ({ group }) => {
	return <div>{group.name}</div>;
};

export default createFragmentContainer(GroupCardView, {
	group: graphql`
		fragment GroupCard_group on Group {
			id
			name
		}
	`,
});
