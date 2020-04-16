import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Testy = styled.li`
	a {
		font-family: Helvetica;
		font-size: 20px;
		color: hotpink;
		padding: 20px;
		display: block;
		text-decoration: none;
		&:hover {
			color: lightblue;
		}
	}
`;

interface Props {
	to: string;
}
<Link to="/">Home</Link>;

const Test: React.FC<Props> = ({ children, to }) => {
	return (
		<Testy>
			<Link to={to}>{children}</Link>
		</Testy>
	);
};

export default Test;
