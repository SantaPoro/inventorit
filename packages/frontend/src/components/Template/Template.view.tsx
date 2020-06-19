import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

import { Footer } from '../Footer';
import { Navbar } from '../Navbar';

import { Template_viewer } from './__generated__/Template_viewer.graphql';
import { Content, GlobalStyles, Layout, Wrapper } from './Template.styles';

interface Props {
	viewer: Template_viewer;
}

const TemplateView: React.FC<Props> = ({ children, viewer }) => {
	return (
		<Layout>
			<GlobalStyles />
			<Navbar viewer={viewer} />
			<Content>
				<Wrapper>{children}</Wrapper>
			</Content>
			<Footer />
		</Layout>
	);
};

export default createFragmentContainer(TemplateView, {
	viewer: graphql`
		fragment Template_viewer on Viewer {
			...Navbar_viewer
		}
	`,
});
