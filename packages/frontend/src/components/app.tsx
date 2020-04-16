import React from 'react';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';

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
					<Route exact path="/">
						Home
					</Route>
					<Route path="/about">Path</Route>
					<Route path="/users">Users</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default Title;
