import React from 'react';

const LoginRoute = 'http://localhost:3000/api/v1/login';

export const LoginPage = () => {
	return (
		<div>
			<p>Login Page</p>
			<a href={LoginRoute}>Login</a>
		</div>
	);
};
