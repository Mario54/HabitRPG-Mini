var React = require("react");

function round(num) {
  return parseFloat(num).toFixed(1);
}

var InfoBubble = React.createClass({
    render() {
        return (<li>{this.props.label} {this.props.text}</li>);
    }
});

var CharacterInfo = React.createClass({
  render() {
    var { user, fetchingUser } = this.props;
    var hp = "",
        mp = "",
        experience = "",
        level = "",
        userDisplay = "";

    console.log(fetchingUser);

    if (fetchingUser) {
        return <div>Fetching user...</div>;
    }

    if (user) {
      hp = user.hp ? <InfoBubble label="HP" text={round(user.hp) + "/" + user.maxHealth} /> : "";
      mp = user.mp ? <InfoBubble label="MP" text={round(user.mp) + "/" + user.maxMP} /> : "";
      experience = user.exp ? <InfoBubble label="XP" text={`${user.exp}/${user.toNextLevel}`} /> : "";
      level = user.lvl ? <InfoBubble label="Level" text={user.lvl} /> : "";
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
