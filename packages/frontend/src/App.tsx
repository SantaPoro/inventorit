import React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';
import styled, { createGlobalStyle } from 'styled-components';

import { App_viewer } from './__generated__/App_viewer.graphql';
import { Footer } from './Footer';
import Navbar from './Navbar';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
  }

  #root {
    height: 100%;
  }
`;

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const Content = styled.main`
	flex-grow: 1;
`;

const Wrapper = styled.div`
	max-width: 500px;
	margin: 0 auto;
`;

interface Props {
	viewer: App_viewer;
}

const App: React.FC<Props> = ({ children, viewer }) => {
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

export default createFragmentContainer(App, {
	viewer: graphql`
		fragment App_viewer on Viewer {
			...Navbar_viewer
		}
	`,
});
