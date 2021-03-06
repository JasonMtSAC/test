import React from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

function Instructions() {
	return (
		<ThemeConsumer>
			{(value) => (
				<div className="instructions-container">
					<h1 className="center-text header-lg">Instructions</h1>
					<ol className="container-sm grid center-text battle-instructions">
						<li>
							<h3 className="header-sm">Enter two Github users</h3>
							<FaUserFriends className={`bg-${value.theme}`} color="rgb(255, 191, 116)" size={140}/>
						</li>
						<li>
							<h3 className="header-sm">Battle</h3>
							<FaFighterJet className={`bg-${value.theme}`} color="#727272" size={140}/>
						</li>
						<li>
							<h3 className="header-sm">See the winners</h3>
							<FaTrophy className={`bg-${value.theme}`} color="rgb(255, 215, 0)" size={140}/>
						</li>
					</ol>
				</div>
			)}
		</ThemeConsumer>
	);
}

class PlayerInput extends React.Component {

	static propTypes = {
		label: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

	state = { username: '' };
	
	handleSubmit = (event) => {
		this.props.onSubmit(this.state.username)
		event.preventDefault();
	}
	handleChange = (event) => {
		this.setState({username: event.target.value})
	}

	render() {
		return (
			<ThemeConsumer>
				{({theme})=>(
					<form className="column player" onSubmit={this.handleSubmit}>
						<label htmlFor="username" className="player-label">
							{this.props.label}
						</label>
						<div className="row player-inputs">
							<input
								type="text"
								id="username"
								className={`input-${theme}`}
								placeholder="github username"
								autoComplete="off"
								value={this.state.username}
								onChange={this.handleChange}
							/>
							<button
								className="btn dark-btn"
								type="submit"
								disabled={!this.state.username}
							>
								Submit
							</button>
						</div>
					</form>
				)
				}
			</ThemeConsumer>
		);
	}
}

function PlayerPreview({username, onReset, label }) {
	return (
		<ThemeConsumer>
			{({theme}) => (
				<div className='column player'>
					<h3 className='player-label'>{label}</h3>
					<div className='row bg-light'>
						<div className='player-info'>
							<img className='avatar-small' src={`https://github.com/${username}.png?size=200`} alt= {`Avatar for ${username}`}/>
							<a className='link' href={`https://github.com/${username}`}>
								{username}
							</a>
						</div>
						<button className='btn-clear flex-center' onClick={onReset}>
							<FaTimesCircle color='rgb(194, 57, 42)' size={26}/>
						</button>
					</div>
				</div>
			)}
		</ThemeConsumer>
	)
}

PlayerPreview.propTypes = {
	label: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
}

export default class Battle extends React.Component {
	state = {
		playerOne: null,
		playerTwo: null,
	};

	handleSubmit = (id, player) => {
		this.setState({
			[id]: player,
		});
	}

	handleReset = (id) => {
		this.setState({
			[id]: null,
		})
	}

	render() {
		const {playerOne, playerTwo} = this.state;
		
		return (
			<React.Fragment>
				<Instructions />
				<div className="players-container">
					<h1 className="center-text header-lg">Players</h1>
					<div className="row space-around">
						{playerOne === null 
							? <PlayerInput
								label="Player One"
								onSubmit={(player) => {this.handleSubmit('playerOne', player)}}
								/>
							: <PlayerPreview
								username={playerOne}
								onReset={() => {this.handleReset('playerOne')}}
								label='Player One'
								/>
						}
						{playerTwo === null 
							? <PlayerInput
								label="Player Two"
								onSubmit={(player) => {this.handleSubmit('playerTwo', player)}}
								/>
							: <PlayerPreview 
								username={playerTwo}
								onReset={() => {this.handleReset('playerTwo')}}
								label="Player Two"
								/>
						}
					</div>

					{(playerOne && playerTwo) && (
						<Link
							className='btn dark-btn btn-space'
							to={{ pathname: '/battle/results', search: `?playerOne=${playerOne}&playerTwo=${playerTwo}` }}
							>
							Battle
						</Link>
					)}
				</div>
			</React.Fragment>
		);
	}
}
