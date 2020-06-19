import React from 'react';

import { makeRouteConfig, Route } from 'found';
import { graphql } from 'react-relay';

import { Template } from './components/Template';
import CreateItem from './CreateItem';
import Group from './Group';
import GroupList from './GroupList';

const Home = () => <div>Home</div>;

export const routeConfig = makeRouteConfig(
	<Route
		Component={Template}
		query={graphql`
			query routes_Template_Query {
				viewer {
					...Template_viewer
				}
			}
		`}
	>
		<Route path="/" Component={Home} />
		<Route path="groups">
			<Route
				Component={GroupList}
				query={graphql`
					query routes_GroupList_Query {
						viewer {
							...GroupList_viewer
						}
					}
				`}
			/>
			<Route path=":groupId">
				<Route
					Component={Group}
					prepareVariables={(params: any) => {
						return {
							id: params.groupId,
						};
					}}
					query={graphql`
						query routes_Group_Query($id: ID!) {
							group: node(id: $id) {
								...Group_group
							}
						}
					`}
				/>
				<Route
					path="create-item"
					Component={CreateItem}
					prepareVariables={(params: any) => {
						return {
							id: params.groupId,
						};
					}}
					query={graphql`
						query routes_CreateItem_Query($id: ID!) {
							group: node(id: $id) {
								...CreateItem_group
							}
						}
					`}
				/>
			</Route>
		</Route>
	</Route>,
);
