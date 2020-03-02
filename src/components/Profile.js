import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import { Logout } from './Logout';

export const Profile = props => {
	let history = useHistory();

	function handleLogout(cookieName, userId) {
		Cookies.remove(cookieName);
		Cookies.remove(userId);
		history.push('/');
	}

	return (
		<div className="user-container">
			<h2 className="user_name">Profile</h2>
			<p>{props.user.id}</p>
			<a>Visit Profile</a>
			{/* figured out how to get the other data, I think it has to do with the functional component, I might need to use a class component */}
			<Logout
				logout={() => {
					handleLogout('access_token_visualizer', 'user_id');
				}}
			/>
		</div>
	);
};
