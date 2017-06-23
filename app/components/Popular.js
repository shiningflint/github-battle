var React = require('react');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      }
    });
  }

  render() {
    var languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
    return(
      <ul className="languages">
        {
          languages.map((lang) => {
            return <li
              className={lang === this.state.selectedLanguage ? "languages__item active" : "languages__item"}
              onClick={this.updateLanguage.bind(null, lang)}
              key={lang}>{lang}</li>
          })
        }
      </ul>
    )
  }
}

module.exports = Popular;
