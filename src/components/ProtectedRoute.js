import React from 'react';
// import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (document.cookie !== '') {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/',
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};
