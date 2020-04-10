import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/app';

ReactDOM.render(<Title name="Inventor" />, document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}
