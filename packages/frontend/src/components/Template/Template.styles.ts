import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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

export const Layout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const Content = styled.main`
	flex-grow: 1;
`;

export const Wrapper = styled.div`
	max-width: 500px;
	margin: 0 auto;
`;
