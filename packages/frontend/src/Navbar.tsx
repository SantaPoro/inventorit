import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';
import styled from 'styled-components';

import { Navbar_viewer } from './__generated__/Navbar_viewer.graphql';

const gammaAuthEndpoint = `${String(process.env.GAMMA_DOMAIN)}/api/oauth/authorize`;
const gammaClientId = String(process.env.GAMMA_CLIENT_ID);

const Wrapper = styled.div`
	max-width: 500px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
`;

const NavbarStyle = styled.nav`
	background: purple;
`;

const NavGroup = styled.div`
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

interface Props {
	viewer: Navbar_viewer;
}

const Navbar: React.FC<Props> = ({ viewer }) => {
	return (
		<NavbarStyle>
			<Wrapper>
				<NavGroup>
					<Link to="/">Home</Link>
					<Link to="/groups">Groups</Link>
				</NavGroup>
				<NavGroup>
					{!viewer.isLoggedIn && (
						<a href={`${gammaAuthEndpoint}?response_type=code&client_id=${gammaClientId}`}>Log in</a>
					)}
					{viewer.isLoggedIn && <button>Log out</button>}
				</NavGroup>
			</Wrapper>
		</NavbarStyle>
	);
};

export default createFragmentContainer(Navbar, {
	viewer: graphql`
		fragment Navbar_viewer on Viewer {
			isLoggedIn
		}
	`,
});
