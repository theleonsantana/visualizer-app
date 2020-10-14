import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Profile } from './Profile';
import Player from './Player';

// API endpoints
const userMe = 'https://api.spotify.com/v1/me';

export default class Visualizer extends Component {
	state = {
		current_user: '',
		access_token: '',
		userInfo: [],
	};

	getUser() {
		const { userInfo } = this.state;
		const auth = `Bearer ${Cookies.get('access_token_visualizer')}`;
		// console.log(this.state.current_user);
		axios
			.get(userMe, { headers: { Authorization: auth }, responseType: 'json' })
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

	render() {
		const { access_token, userInfo } = this.state;

		return (
			<div>
				<h1>Visualizer App</h1>
				<Player />
				<Profile user={userInfo} />
			</div>
		);
	}
}
