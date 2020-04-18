import 'antd/dist/antd.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import AppScreen from './screens/app';

ReactDOM.render(
	<Router>
		<AppScreen />
	</Router>,
	document.getElementById('root'),
);

if ((module as any).hot) {
	(module as any).hot.accept();
}
