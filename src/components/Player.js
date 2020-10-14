import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default class Player extends Component {
	state = {
		access_token: '',
		deviceId: '',
		playMusic: false,
		error: '',
		trackName: 'Track Name',
		artistName: 'Artist Name',
		albumName: 'Album Name',
		albumArt: '',
		playing: false,
		position: 0,
		duration: 1,
	};
	// this will later be set by setInterval
	playerCheckInterval = null;

	// Button to launch player
	handleLogin() {
		this.setState({ access_token: Cookies.get('access_token_visualizer') });
		this.setState({ playMusic: true });
		this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
	}

	// when we receive a new update from the player
	onStateChanged(state) {
		// only update if we got a real state
		if (state !== null) {
			const {
				current_track: currentTrack,
				position,
				duration,
			} = state.track_window;
			const trackName = currentTrack.name;
			const albumName = currentTrack.album.name;
			const albumArt = currentTrack.album.images[0].url;
			const artistName = currentTrack.artists
				.map(artist => artist.name)
				.join(', ');
			const playing = !state.paused;
			this.setState({
				position,
				duration,
				trackName,
				albumName,
				albumArt,
				artistName,
				playing,
			});
		} else {
			// state was null, user might have swapped to another device
			this.setState({
				error: 'Looks like you might have swapped to another device?',
			});
		}
	}

	createEventHandlers() {
		// problem setting up the player
		this.player.on('initialization_error', e => {
			console.error(e);
		});
		// problem authenticating the user.
		// either the token was invalid in the first place,
		// or it expired (it lasts one hour)
		this.player.on('authentication_error', e => {
			console.error(e);
			this.setState({ playMusic: false });
		});
		// currently only premium accounts can use the API
		this.player.on('account_error', e => {
			console.error(e);
		});
		// loading/playing the track failed for some reason
		this.player.on('playback_error', e => {
			console.error(e);
		});

		// Playback status updates
		this.player.on('player_state_changed', state => this.onStateChanged(state));

		// Ready
		this.player.on('ready', async data => {
			let { device_id } = data;
			console.log('Let the music play on!');
			// set the deviceId variable, then let's try
			// to swap music playback to *our* player!
			await this.setState({ deviceId: device_id });
			this.transferPlaybackHere();
		});
	}

	checkForPlayer() {
		const { access_token } = this.state;
		// if the Spotify SDK has loaded
		if (window.Spotify !== null) {
			// cancel the interval
			clearInterval(this.playerCheckInterval);
			// create a new player
			this.player = new window.Spotify.Player({
				name: 'Visualizer App',
				getOAuthToken: cb => {
					cb(access_token);
				},
			});
			// set up the player's event handlers
			this.createEventHandlers();

			// finally, connect!
			this.player.connect();
		}
	}

	onPrevClick() {
		this.player.previousTrack();
	}

	onPlayClick() {
		this.player.togglePlay();
	}

	onNextClick() {
		this.player.nextTrack();
	}

	transferPlaybackHere() {
		const { deviceId, access_token } = this.state;
		const playerUrl = 'https://api.spotify.com/v1/me/player';
		const options = {
			method: 'PUT',
			url: playerUrl,
			headers: {
				authorization: `Bearer ${access_token}`,
			},
			data: {
				device_ids: [deviceId],
				play: true,
			},
		};
		axios(options);
		// const goodResponse =
		// 	response && response.status === 200 && response.statusText === 'OK';
		// if (goodResponse) {
		// 	let data = response.data;
		// 	console.log(data);
		// }
	}

	render() {
		const {
			access_token,
			playMusic,
			trackName,
			artistName,
			albumName,
			albumArt,
			error,
			playing,
		} = this.state;

		return (
			<div className="App">
				<div className="App-header">
					<h2>Now Playing</h2>
				</div>

				{playMusic ? (
					<div>
						<img src={albumArt} width="300" height="300" />
						<p>Artist: {artistName}</p>
						<p>Track: {trackName}</p>
						<p>Album: {albumName}</p>
						<p>
							<button onClick={() => this.onPrevClick()}>Previous</button>
							<button onClick={() => this.onPlayClick()}>
								{playing ? 'Pause' : 'Play'}
							</button>
							<button onClick={() => this.onNextClick()}>Next</button>
						</p>
					</div>
				) : (
					<div>
						<p className="App-intro">Initialize the player</p>
						<p>
							<button onClick={() => this.handleLogin()}>Launch</button>
						</p>
					</div>
				)}
			</div>
		);
	}
}
