var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var Loading = require('./Loading');
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');

function Profile(props) {
  return(
    <PlayerPreview
      avatar = {props.info.avatar_url}
      username = {props.info.login}
      >
      <ul className='space-list-items'>
        {props.info.name && <li>{props.info.name}</li>}
        {props.info.location && <li>{props.info.location}</li>}
        {props.info.company && <li>{props.info.company}</li>}
        <li>Followers: {props.info.followers}</li>
        <li>Following: {props.info.following}</li>
        <li>Public Repos: {props.info.public_repos}</li>
        {props.info.blog && <li><a href={props.info.blog}>{props.info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player(props) {
  return(
    <div>
      <h2 className='header'>{props.label}</h2>
      <h3 style={{textAlign: 'center'}}>{props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    var players = queryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then((results) => {
      if(results === null) {
        return this.setState(() => {
          return {
            error: 'Looks like there was error. Check that both users exist on Github',
            loading: false,
          }
        });
      }

      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    });
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if(loading === true) {
      return <Loading />
    }

    if(error) {
      return(
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }

    return(
      <div className='flex'>
        <Player
          label= 'Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label= 'Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    );
  }
}

module.exports = Results;
