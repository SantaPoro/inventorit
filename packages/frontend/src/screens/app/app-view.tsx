import React from 'react';

import { Layout, Menu, PageHeader } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';

import { useAuth } from './contexts/auth-context';
import GroupsScreen from './screens/groups';
import HomeScreen from './screens/home';
import ItemsScreen from './screens/items';

const AppView = () => {
	const { isAuthenticated } = useAuth();

	return (
		<Layout>
			<Layout.Header>
				<Menu theme="dark" mode="horizontal">
					<Menu.Item key="0">
						<Link to="/">InventorIT</Link>
					</Menu.Item>
					<Menu.Item key="1">
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/groups">Groups</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/items">Items</Link>
					</Menu.Item>
				</Menu>
			</Layout.Header>
			<Layout.Content>
				<PageHeader
					onBack={() => null}
					title="Content"
					subTitle={isAuthenticated ? 'Logged in' : 'Not logged in'}
				/>
				,
				<Switch>
					<Route exact path="/" component={HomeScreen} />
					<Route exact path="/groups" component={GroupsScreen} />
					<Route exact path="/items" component={ItemsScreen} />
				</Switch>
			</Layout.Content>
			<Layout.Footer>InventorIT</Layout.Footer>
		</Layout>
	);
};

export default AppView;
