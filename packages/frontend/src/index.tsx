import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserProtocol, queryMiddleware } from 'farce';
import { createFarceRouter, createRender } from 'found';
import { Resolver } from 'found-relay';

import environment from './relay-environment';
import { routeConfig } from './routes';

const Router = createFarceRouter({
	historyProtocol: new BrowserProtocol(),
	historyMiddlewares: [queryMiddleware],
	routeConfig,
	render: createRender({}),
});

ReactDOM.render(<Router resolver={new Resolver(environment)} />, document.getElementById('root'));

if ((module as any).hot) {
	(module as any).hot.accept();
}
