import React from 'react';

import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Test from './testlink';

const Navbar = styled.nav`
	widht: 100%;
	height: 100px;
	background: cyan;
	display: flex;
`;

const Nav = () => {
	return (
		<Navbar>
			{' '}
			INVENTORit
			<Test to="/">test1</Test>
			<Test to="/about">test2</Test>
			<Test to="/users">test1⅋⅋⅋⅋⅋⅋⅋4</Test>
		</Navbar>
	);
};

export default Nav;
