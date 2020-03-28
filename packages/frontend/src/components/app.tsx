import React from 'react';

interface Props {
	name: string;
}

const Title: React.FC<Props> = ({ name }) => {
	return (
		<div>
			<h1>InventorIT: {name} asdf 123asdasd</h1>
		</div>
	);
};

export default Title;
