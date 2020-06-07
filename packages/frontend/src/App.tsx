import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { App_viewer } from './__generated__/App_viewer.graphql';
import { Footer } from './Footer';
import Navbar from './Navbar';

interface Props {
	viewer: App_viewer;
}

const App: React.FC<Props> = ({ children, viewer }) => {
	return (
		<React.Fragment>
			<Navbar viewer={viewer} />
			{children}
			<Footer />
		</React.Fragment>
	);
};

export default createFragmentContainer(App, {
	viewer: graphql`
		fragment App_viewer on Viewer {
			...Navbar_viewer
		}
	`,
});
