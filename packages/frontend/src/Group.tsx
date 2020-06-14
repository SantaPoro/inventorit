import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { Group_group } from './__generated__/Group_group.graphql';

interface Props {
	group: Group_group;
}

const Group: React.FC<Props> = ({ group }) => {
	return <div>{group.name}</div>;
};

export default createFragmentContainer(Group, {
	group: graphql`
		fragment Group_group on Group {
			name
		}
	`,
});
