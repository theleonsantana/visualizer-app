import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Logout } from './Logout';

// API endpoints
const userMe = 'https://api.spotify.com/v1/me';

export default class Visualizer extends Component {
	state = {
		current_user: '',
		access_token: '',
	};

	componentDidMount() {
		this.setState({ current_user: Cookies.get('user_id') });
		this.setState({ access_token: Cookies.get('access_token_visualizer') });
	}

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

	handleLogout = (cookieName, userId) => {
		const { history } = this.props;
		Cookies.remove(cookieName);
		Cookies.remove(userId);
		history.push('/');
	};

	render() {
		console.log(Cookies.get('access_token_visualizer'));
		return (
			<div>
				<h1>Visualizer App</h1>

				<Logout
					logout={() => {
						this.handleLogout('access_token_visualizer', 'user_id');
					}}
				/>
			</div>
		);
	}
}
