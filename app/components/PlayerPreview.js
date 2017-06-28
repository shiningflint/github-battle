var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (
    <div className='preview'>
      <p>
        <img
          className='avatar-preview'
          src={props.avatar}
          alt={'Avatar for' + props.avatar}
        />
      </p>
      <h2 className='username'>@{props.username}</h2>
      {props.children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;
