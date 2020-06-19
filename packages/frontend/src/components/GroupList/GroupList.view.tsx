import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { GroupCard } from '../GroupCard';

import { GroupList_viewer } from './__generated__/GroupList_viewer.graphql';

interface Props {
	viewer: GroupList_viewer;
}

const GroupListView: React.FC<Props> = ({ viewer }) => {
	if (!viewer.user) {
		return (
			<React.Fragment>
				{viewer.groups.edges.map(edge => (
					<GroupCard key={edge.node.id} group={edge.node} />
				))}
			</React.Fragment>
		);
	}

	const otherGroups = viewer.groups.edges.filter(
		edge => !viewer.user?.groups.edges.find(e => e.node.id === edge.node.id),
	);
	return (
		<React.Fragment>
			<h2>My groups</h2>
			<ul>
				{viewer.user.groups.edges.map(edge => (
					<GroupCard key={edge.node.id} group={edge.node} />
				))}
			</ul>
			{otherGroups.length > 0 && (
				<React.Fragment>
					<h2>Other groups</h2>
					<ul>
						{otherGroups.map(edge => (
							<GroupCard key={edge.node.id} group={edge.node} />
						))}
					</ul>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default createFragmentContainer(GroupListView, {
	viewer: graphql`
		fragment GroupList_viewer on Viewer {
			groups {
				edges {
					node {
						id
						...GroupCard_group
					}
				}
			}
			user {
				groups {
					edges {
						node {
							id
							...GroupCard_group
						}
					}
				}
			}
		}
	`,
});
