import React from 'react';

import { LoginPage } from './components/Login';

import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Visualizer from './components/Visualizer';

export const AppRouter = () => {
	return (
		<Switch>
			<Route exact path="/" component={LoginPage} />
			<Route exact path="/app" component={Visualizer} />
			<Route path="*" component={() => '404 NOT FOUND'} />
		</Switch>
	);
};
