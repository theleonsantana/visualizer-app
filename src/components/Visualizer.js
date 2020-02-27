import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Logout } from './Logout';

export default class Visualizer extends Component {
	// getUser = () => {
	// 	axios
	// 		.get(userData)
	// 		.then(({ data }) => {
	// 			this.setState({ spotifyData: data[0] });
	// 			localStorage.setItem(
	// 				'access_token',
	// 				this.state.spotifyData.access_token
	// 			);
	// 		})
	// 		.catch(function(error) {
	// 			console.log(error);
	// 		});
	// };

	handleLogout = cookieName => {
		const { history } = this.props;
		Cookies.remove(cookieName);
		history.push('/');
	};
	render() {
		return (
			<div>
				<h1>Visualizer App</h1>

				<Logout
					logout={() => {
						this.handleLogout('access_token_visualizer');
					}}
				/>
			</div>
		);
	}
}
