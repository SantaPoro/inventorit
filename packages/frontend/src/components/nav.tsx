import React from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
	widht: 100%;
	height: 100px;
	background: red;
`;

const ColouredNavbar = styled(Navbar)`
	background: blue;
`;
const Nav = () => {
	return <Navbar> INVENTORit</Navbar>;
};

export default Nav;
