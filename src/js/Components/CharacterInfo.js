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

    if (user) {
      hp = user.hp ? <li>HP: {round(user.hp)}/{user.maxHealth}</li> : "";
      mp = user.mp ? <li>MP: {round(user.mp)}/{user.maxMP}</li> : "";
      experience = user.exp ? <li>XP: {user.exp}/{user.toNextLevel}</li> : "";
      level = user.lvl ? <li>Level: {user.lvl}</li> : "";
      userDisplay = user.name ? user.name : "";
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
