import React from 'react';

interface Props {
	name: string;
}

const Title: React.FC<Props> = ({ name }) => {
	return (
		<div>
			<h1>InventorIT: {name}IT</h1>
		</div>
	);
};

export default Title;
