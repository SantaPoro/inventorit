import React from 'react';

import { makeRouteConfig, Route } from 'found';
import { graphql } from 'react-relay';

import App from './App';

export const routeConfig = makeRouteConfig(
	<Route
		path="/"
		Component={App}
		query={graphql`
			query routes_App_Query {
				viewer {
					...App_viewer
				}
			}
		`}
	/>,
);
