import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
	max-width: 500px;
	margin: 0 auto;
`;

const FooterStyle = styled.footer`
	padding: 20px;
	background: cyan;
`;

export const Footer = () => {
	return (
		<FooterStyle>
			<Wrapper>This is the footer</Wrapper>
		</FooterStyle>
	);
};
