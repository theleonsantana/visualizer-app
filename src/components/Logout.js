import React from 'react';

export const Logout = props => {
	return (
		<div>
			<button onClick={props.logout}>Log Out</button>
		</div>
	);
};
