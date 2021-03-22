import React from 'react';
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card';
import Loading from './Loading';
import PropTypes from 'prop-types'
import Tooltip from './Tooltip'
import Hover from './Hover'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

class ProfileList extends React.Component {
	static propType = {
		profile: PropTypes.object.isRequired
	}

	render() {
		const { profile } = this.props;

		return (
			<ul className='card-list'>
				<li>
					<FaUser color='rgb(239, 115, 155)' size={22} />
					{profile.name}
				</li>
				{profile.location && (
					<li>
						<Tooltip text='Users Location' hovering='someString'>
							<FaCompass color='rgb(144, 155, 255)' size={22} />
							{profile.location}
						</Tooltip>
					</li>
				)}	
				{profile.company && (
					<li>
						<Tooltip text='Users Company'>
							<FaBriefcase color='#795548' size={22} />
							{profile.company}
						</Tooltip>
					</li>
				)}
				<li>
					<FaUserFriends color='rgb(64, 183, 95)' size={22} />
					{profile.following.toLocaleString()} following
				</li>	
			</ul>
		)
	}
}

export default class Results extends React.Component {

	static propType = {
		playerOne: PropTypes.object.isRequired,
		playerTwo: PropTypes.object.isRequired,
	}

	state = {
		winner: null,
		loser: null,
		error: null,
		loading: true,
	}

	componentDidMount() {
		const { playerOne, playerTwo } = queryString.parse(this.props.location.search)
		
		battle([ playerOne, playerTwo])
			.then(players => {
				this.setState({
					winner: players[0],
					loser: players[1],
					error: null,
					loading: false
				})
			})
			.catch(({message})=>{
				this.setState({
					error: message,
					loading: false
				})
			})
	}

	render() {
		const { winner, loser, error, loading } = this.state
		
		if (loading === true) return <Loading text='Battling'/>
		if (error) return <p className='center-text error'>{error}</p>
			
		return (
			<React.Fragment>
				<div className='grid space-around container-sm'>
					<Card
						header={winner.score === loser.score ? 'Tie' : 'Winner'}
						avatar={winner.profile.avatar_url}
						name={winner.profile.login}
						href={winner.profile.html_url}
					>
						<ProfileList profile={winner.profile}/>	
					</Card>
						
					<Card
						header={winner.score === loser.score ? 'Tie' : 'Loser'}
						avatar={loser.profile.avatar_url}
						name={loser.profile.login}
						href={loser.profile.html_url}
					>
						<ProfileList profile={loser.profile}/>	
					</Card>
				</div>
				<Link to='/battle' className='btn dark-btn btn-space'>Reset</Link>
			</React.Fragment>
		)
	}
}