import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import { GroupList_viewer } from './__generated__/GroupList_viewer.graphql';

interface Props {
	viewer: GroupList_viewer;
}

const GroupList: React.FC<Props> = ({ viewer }) => {
	return (
		<ul>
			{viewer.groups.edges.map(edge => (
				<li key={edge.node.id}>
					<Link to={`/groups/${edge.node.id}`}>{edge.node.name}</Link>
				</li>
			))}
		</ul>
	);
};

export default createFragmentContainer(GroupList, {
	viewer: graphql`
		fragment GroupList_viewer on Viewer {
			groups {
				edges {
					node {
						id
						name
					}
				}
			}
		}
	`,
});
