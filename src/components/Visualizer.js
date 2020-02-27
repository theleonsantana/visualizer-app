import React, { Component } from 'react';
import axios from 'axios';

const userData = 'http://localhost:3000/api/v1/users';

export default class Visualizer extends Component {
	state = {
		spotifyData: {},
	};

	componentDidMount() {
		this.getUser();
		// this.storeToken();
	}

	getUser = () => {
		axios
			.get(userData)
			.then(({ data }) => {
				this.setState({ spotifyData: data[0] });
				localStorage.setItem('access_token', data[0].access_token);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	// storeToken = () => {
	// 	const { access_token } = this.state;
	// 	console.log(access_token);
	// };

	render() {
		return <div>Visualizer App</div>;
	}
}
