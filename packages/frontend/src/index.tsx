import React from 'react';
import ReactDOM from 'react-dom';

import Title from './components/app';

ReactDOM.render(<Title name="Inventori" />, document.getElementById('root'));

if ((module as any).hot) {
	(module as any).hot.accept();
}
