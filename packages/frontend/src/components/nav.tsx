import React from 'react';

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
			<Test>test1</Test>
			<Test>test2</Test>
			<Test>test1⅋⅋⅋⅋⅋⅋⅋4</Test>
		</Navbar>
	);
};

export default Nav;
