import styled from 'styled-components';

export const Wrapper = styled.div`
	max-width: 500px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
`;

export const Navbar = styled.nav`
	background: purple;
`;

export const NavGroup = styled.div`
	display: flex;
	> * {
		padding: 20px;
		display: block;

		color: white;
		background: none;
		border: none;
		font-size: 1em;
		text-decoration: none;
		font-family: sans-serif;
	}
`;
