var React = require("react");

function round(num) {
  return parseFloat(num).toFixed(1);
}

var CharacterInfo = React.createClass({
  render() {
    var user = this.props.user;
    console.log(user && user.toJS());
    var hp = "",
        mp = "",
        experience = "",
        level = "",
        userDisplay = "";

    console.log(user);

    if (user) {
      hp = <li>HP: {round(user.get("hp"))}/{user.get("maxHealth")}</li>;
      mp = <li>MP: {round(user.get("mp"))}/{user.get("maxMP")}</li>;
      experience = <li>XP: {user.get("exp")}/{user.get("toNextLevel")}</li>;
      level = <li>Level: {user.get("lvl")}</li>;
      userDisplay = user.get("name");
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
