import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import { Navbar_viewer } from './__generated__/Navbar_viewer.graphql';
import { Navbar, NavGroup, Wrapper } from './Navbar.styles';

const gammaAuthEndpoint = `${String(process.env.GAMMA_DOMAIN)}/api/oauth/authorize`;
const gammaClientId = String(process.env.GAMMA_CLIENT_ID);

interface Props {
	viewer: Navbar_viewer;
}

const NavbarView: React.FC<Props> = ({ viewer }) => {
	return (
		<Navbar>
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
		</Navbar>
	);
};

export default createFragmentContainer(NavbarView, {
	viewer: graphql`
		fragment Navbar_viewer on Viewer {
			isLoggedIn
		}
	`,
});
