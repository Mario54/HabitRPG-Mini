var React = require("react");

function round(num) {
  return parseFloat(num).toFixed(1);
}

var CharacterInfo = React.createClass({
  render() {
    var user = this.props.user;
    var hp = "",
        mp = "",
        experience = "",
        level = "",
        userDisplay = "";

    console.log(user);

    if (user) {
      hp = <li>HP: {round(user["hp"])}/{user["maxHealth"]}</li>;
      mp = <li>MP: {round(user["mp"])}/{user["maxMP"]}</li>;
      experience = <li>XP: {user["exp"]}/{user["toNextLevel"]}</li>;
      level = <li>Level: {user.lvl}</li>;
      userDisplay = user["name"];
    }

    return <div>
      <ul className="user-info-list">
        {userDisplay}
        {hp}
        {mp}
        {experience}
        {level}
      </ul>
    </div>;
  }
});

export default CharacterInfo;
