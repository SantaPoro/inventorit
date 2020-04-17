import React from 'react';

import styled from 'styled-components';

const Testy = styled.a`
	font-family: Helvetica;
	font-size: 20px;
	color: hotpink;
	padding: 20px;
	display: block;
	text-decoration: none;
	&:hover {
		color: lightblue;
	}
`;

const Test: React.FC = ({ children }) => {
	return (
		<Testy>
			{' '}
			<Testy href="https://google.com">{children}</Testy>
		</Testy>
	);
};

export default Test;
