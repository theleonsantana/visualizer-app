import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Logout } from './Logout';

// API endpoints
const userMe = 'https://api.spotify.com/v1/me';

export default class Visualizer extends Component {
	state = {
		current_user: '',
		access_token: '',
		userInfo: {},
	};

	getUser() {
		// const { current_user, access_token } = this.state;
		const auth = `Bearer ${Cookies.get('access_token_visualizer')}`;
		// console.log(this.state.current_user);
		axios
			.get(userMe, { headers: { Authorization: auth } })
			.then(({ data }) => {
				this.setState({ userInfo: data });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	componentDidMount() {
		this.setState({ current_user: Cookies.get('user_id') });
		this.setState({ access_token: Cookies.get('access_token_visualizer') });
		this.getUser();
	}

	handleLogout = (cookieName, userId) => {
		const { history } = this.props;
		Cookies.remove(cookieName);
		Cookies.remove(userId);
		history.push('/');
	};

	render() {
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
