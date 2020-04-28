import React from 'react';

import { Layout, Menu, PageHeader } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';

import GuestRoute from './components/guest-route';
import PrivateRoute from './components/private-route';
import { useAuth } from './contexts/auth-context';
import AuthScreen from './screens/auth';
import GroupsScreen from './screens/groups';
import HomeScreen from './screens/home';
import ItemsScreen from './screens/items';

const AppView = () => {
	const { isAuthenticated, logout, user } = useAuth();

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
					{isAuthenticated && (
						<Menu.Item key="4">
							<a
								onClick={e => {
									e.preventDefault();
									logout();
								}}
							>
								Logout
							</a>
						</Menu.Item>
					)}
				</Menu>
			</Layout.Header>
			<Layout.Content>
				<PageHeader
					onBack={() => null}
					title="Content"
					subTitle={isAuthenticated ? `Logged in (${user && user.name})` : 'Not logged in'}
				/>
				,
				<Switch>
					<Route exact path="/" component={HomeScreen} />
					<PrivateRoute exact path="/groups" component={GroupsScreen} />
					<PrivateRoute exact path="/items" component={ItemsScreen} />
					<GuestRoute path="/auth" component={AuthScreen} />
				</Switch>
			</Layout.Content>
			<Layout.Footer>InventorIT</Layout.Footer>
		</Layout>
	);
};

export default AppView;
