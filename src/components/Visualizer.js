import React, { Component } from 'react';
import axios from 'axios';

const userData = 'http://localhost:3000/api/v1/users';

export default class Visualizer extends Component {
	state = {
		SpotifyData: {},
	};
	componentDidMount() {
		const { access_token } = this.state.SpotifyData;
		axios
			.get(`${userData}`)
			.then(({ data }) => this.setState({ SpotifyData: data }))
			.catch(({ response }) => console.log(response));
		localStorage.setItem('access_token', access_token);
	}
	render() {
		return <div>Visualizer App</div>;
	}
}
