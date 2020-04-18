import 'antd/dist/antd.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

import AppScreen from './screens/app';

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: String(process.env.GRAPHQL_API_ENDPOINT),
	}),
});

ReactDOM.render(
	<Router>
		<ApolloProvider client={client}>
			<AppScreen />
		</ApolloProvider>
	</Router>,
	document.getElementById('root'),
);

if ((module as any).hot) {
	(module as any).hot.accept();
}
