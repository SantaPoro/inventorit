import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';

import HomePage from './home-page';
import Nav from './nav';

interface Props {
	name: string;
}

const Title: React.FC<Props> = ({ name }) => {
	return (
		<Router>
			<div>
				<Normalize />
				<Nav />
				<h1>InventorIT: {name}IT</h1>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/about">Path</Route>
					<Route path="/users">Users</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default Title;
