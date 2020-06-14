import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import { Navbar_viewer } from './__generated__/Navbar_viewer.graphql';

const gammaAuthEndpoint = `${String(process.env.GAMMA_DOMAIN)}/api/oauth/authorize`;
const gammaClientId = String(process.env.GAMMA_CLIENT_ID);

interface Props {
	viewer: Navbar_viewer;
}

const Navbar: React.FC<Props> = ({ viewer }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
			</ul>
			<ul>
				{!viewer.isLoggedIn && (
					<li>
						<a href={`${gammaAuthEndpoint}?response_type=code&client_id=${gammaClientId}`}>Log in</a>
					</li>
				)}
				{viewer.isLoggedIn && (
					<li>
						<button>Log out</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default createFragmentContainer(Navbar, {
	viewer: graphql`
		fragment Navbar_viewer on Viewer {
			isLoggedIn
		}
	`,
});
