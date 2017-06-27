var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label className='player-title' htmlFor='username'>
            {this.props.label}
          </label>
          <input
            id='username'
            placeholder='github username'
            type='text'
            autoComplete='off'
            value={this.state.username}
            onChange={this.handleChange}
            />
          <button
            className='button'
            type='submit'
            disabled={!this.state.username}>
            Submit</button>
        </form>
      </div>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(() => {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  render() {
    return(
      <div className='flex'>
        {!this.state.playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit} />
        }
        {!this.state.playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit} />
        }
      </div>
    )
  }
}

module.exports = Battle;
