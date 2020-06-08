import React from 'react';

import { Link } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import { Navbar_viewer } from './__generated__/Navbar_viewer.graphql';

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
				{!viewer.isLoggedIn && <li>Log in</li>}
				{viewer.isLoggedIn && <li>Log out</li>}
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
