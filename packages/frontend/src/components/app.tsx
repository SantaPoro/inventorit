import React from 'react';

import { Normalize } from 'styled-normalize';

import Nav from './nav';

interface Props {
	name: string;
}

const Title: React.FC<Props> = ({ name }) => {
	return (
		<div>
			<Normalize />
			<Nav />
			<h1>InventorIT: {name}IT</h1>
		</div>
	);
};

export default Title;
